const puppeteer = require('puppeteer');
const fs = require('fs');

const currentDate = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}-${mm}-${yyyy}`;
};

const createFolder = async dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const numberTramiteToObject = numero => {
  return {
    region: numero.substr(0, 2),
    partido: numero.substr(2, 3),
    tramite: numero.substr(5, 7),
    year: numero.substr(12, 2)
  };
};

const loginMedicamentos = async (page, usuario) => {
  try {
    await page.goto('http://sistemasl.ioma.gba.gov.ar/sistemas/farma_ambu', {
      waitUntil: 'networkidle2'
    });

    await page.type('input[name="usuario"]', usuario.name.toLowerCase());
    await page.type('input[name="contra"]', usuario.password.toLowerCase());

    await page.evaluate(() => {
      document.getElementsByTagName('a')[0].click();
    });

    await page.waitForNavigation();
    console.log('Login medicamentos success');
    return true;
  } catch (e) {
    console.log(`Error en login: ${e}`);
    return e;
  }
};

const searchNumberTramite = async (page, numeroTramite) => {
  try {
    const { region, partido, tramite, year } = numberTramiteToObject(
      numeroTramite
    );

    await page.evaluate(() => {
      document.getElementsByTagName('a')[0].click();
    });

    await page.waitForNavigation();

    await page.type('input[name="nroreg"]', region);
    await page.type('input[name="nropar"]', partido);
    await page.type('input[name="nronro"]', tramite);
    await page.type('input[name="nroaa"]', year);

    await page.evaluate(() => {
      document.getElementsByTagName('a')[0].click();
    });

    console.log('Search Number Tramite success');
    await page.waitForNavigation();
    return true;
  } catch (e) {
    console.log(`Error en Search Number Tramite: ${e}`);
    return e;
  }
};

// Si existe tramite aprobado retorna true y la cantidad de recetas en caso contrario false
const existRecetas = async (usuario, numeroTramite) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await loginMedicamentos(page, usuario);
    await searchNumberTramite(page, numeroTramite);

    const response = await page.evaluate(() => {
      const receta = document.getElementsByName('receta_nro');
      if (receta) {
        return {
          estado: true,
          recetas: document.getElementsByName('receta_nro')[0].childElementCount
        };
      }
      return { estado: false, recetas: 0 };
    });
    console.log('existRecetas success');
    await browser.close();
    return response;
  } catch (e) {
    console.log(`Error en existRecetas: ${e}`);
    return e;
  }
};

const generatePdfProvicion = async (page, pathFolderSavePdf, keyReceta) => {
  try {
    // Click en boton enviar
    await page.evaluate(receta => {
      document.getElementsByTagName('form')[0].target = '';
      const option = document.getElementsByName('receta_nro')[0][receta].value;
      document.getElementsByName('receta_nro')[0][0].value = option;
      document.getElementsByTagName('a')[0].click();
    }, keyReceta);

    await page.waitForNavigation();

    await page.pdf({
      path: `${pathFolderSavePdf}/${keyReceta}.pdf`,
      format: 'A4'
    });

    console.log('Generate Pdf Provicion success');
    return true;
  } catch (e) {
    console.log(`Error Generate Pdf Provicion: ${e}`);
    return e;
  }
};

const generateMedicamentos = async (numeroTramite, usuario, pathSelected) => {
  try {
    const today = currentDate();
    const objectResponse = {
      tramite: numeroTramite,
      afiliado: '',
      incio: '',
      estado: 'Pendiente',
      autorizaciones: []
    };

    await createFolder(`${pathSelected}/medicamentos`);

    const { estado, recetas } = await existRecetas(usuario, numeroTramite);

    if (estado) {
      await createFolder(`${pathSelected}/medicamentos/${today}`);
      const pathFolderSavePdf = `${pathSelected}/medicamentos/${today}/${numeroTramite}`;
      await createFolder(pathFolderSavePdf);
      objectResponse.estado = 'Autorizado';

      for (let r = 0; r < recetas; r++) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await loginMedicamentos(page, usuario);
        await searchNumberTramite(page, numeroTramite);
        await generatePdfProvicion(page, pathFolderSavePdf, r);
        objectResponse.autorizaciones.push({
          numeroAutorizacion: '',
          numeroReceta: r,
          estado
        });
        await browser.close();
      }
    }

    return objectResponse;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export default generateMedicamentos;
