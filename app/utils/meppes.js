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

const setHiddenInput = async (page, index, value) => {
  await page.evaluate(
    data => {
      document.getElementsByTagName('input')[data.index].value = data.value;
    },
    { value, index }
  );
};

const loginMeppes = async (page, usuario) => {
  try {
    await page.goto(
      'http://sistemasl.ioma.gba.gov.ar/sistemas/meppes/index.php',
      { waitUntil: 'networkidle2' }
    );

    await page.type('input[type="text"]', usuario.name.toUpperCase());
    await page.type('input[type="password"]', usuario.password.toUpperCase());

    await page.evaluate(() => {
      document.getElementsByTagName('input')[2].click();
    });

    await page.waitForNavigation();
    console.log('Login meppes success');
    return true;
  } catch (e) {
    console.log(`Error en login: ${e}`);
    return false;
  }
};

const searchNumberTramite = async (page, numeroTramite, region) => {
  try {
    await page.goto(
      'http://sistemasl.ioma.gba.gov.ar/sistemas/meppes/consul_tramite1.php',
      { waitUntil: 'networkidle2' }
    );

    await setHiddenInput(page, 1, region);

    await page.type('input[type="text"]', numeroTramite);

    await page.evaluate(() => {
      document.getElementsByTagName('input')[6].click();
    });
    console.log('Search Number Tramite success');
    await page.waitForNavigation();
    return true;
  } catch (e) {
    console.log(`Error en Search Number Tramite: ${e}`);
    return false;
  }
};

// Si existe tramite aprobado se situa en la pag para imprimir recetas
// Si tiene observaciones las imprime
const viewRecetas = async (
  page,
  printObservaciones = true,
  printRecetas = true
) => {
  try {
    const response = await page.evaluate(
      data => {
        const element = Array.from(document.querySelectorAll('table tbody tr'));
        const { printObservaciones, printRecetas } = data;
        let observaciones = {
          numberAfiliado: null,
          numberTramite: null,
          fechaInicio: null,
          observacion: null
        };
        // If la tabla tiene no esta vacia
        if (element.length > 1) {
          // If el a;o del tramite es igual al a;o actual
          const nowYear = new Date().getFullYear().toString();
          if (element[1].childNodes[0].textContent.substr(6) === nowYear) {
            // If tiene observacion se parsea y luego se imprime
            const numberTramite = document.getElementsByTagName('tr')[1]
              .childNodes[1].textContent;
            const numberAfiliado = document.getElementsByTagName('tr')[1]
              .childNodes[2].textContent;
            const fechaInicio = document.getElementsByTagName('tr')[1]
              .childNodes[0].textContent;
            observaciones = {
              numberAfiliado,
              numberTramite,
              fechaInicio
            };
            if (
              element[1].childNodes[4].textContent.trim() === 'Leer' &&
              printObservaciones
            ) {
              const obsHtml = document.getElementsByTagName('tr')[1]
                .childNodes[4].innerHTML;
              const observacion = obsHtml
                .substring(
                  obsHtml.lastIndexOf('(') + 1,
                  obsHtml.lastIndexOf(')')
                )
                .replace('consul_tramite_obser.php?observa= ', '');
              observaciones.observacion = observacion;
            }
            // If tramite esta aprobado click en "Ver recetas"
            if (
              /* element[1].childNodes[3].textContent === "A" && */ printRecetas
            ) {
              document
                .getElementsByTagName('tr')[1]
                .childNodes[5].lastChild[2].click();
            }
          }
        }
        return observaciones;
      },
      { printObservaciones, printRecetas }
    );
    console.log('View recetas success');
    return response;
  } catch (e) {
    console.log(`Error en view recetas: ${e}`);
    return false;
  }
};

// Devuelve arreglo de tipo object con numero de autorizacion de cada receta y boolean con estado
const getArrayAutorizaciones = async page => {
  try {
    const response = await page.evaluate(async () => {
      // Array con todas las tables
      let arrayAutorizaciones = [];
      const tables = Array.from(document.querySelectorAll('table'));

      console.log(tables);

      tables.map(async t => {
        // Evaluo si esta autorizada o rechazada la provicion el resultado es un booleano
        const estadoAutorizacion =
          t.lastChild.children[4].children[0].children[0].children[0].value ===
          'Imprimir Recetas';
        arrayAutorizaciones.push({
          numero: t.lastChild.children[4].children[0].children[0].children[1].value.trim(),
          receta: t.lastChild.children[1].cells[1].textContent.trim(),
          estado: estadoAutorizacion
        });
      });

      return arrayAutorizaciones;
    });
    return response;
  } catch (e) {
    console.log(`Error en getArrayAutorizaciones: ${e}`);
    return e;
  }
};

const getCantidadProvicionesAutorizadas = async (page, numeroAutorizacion) => {
  try {
    await page.goto(
      `http://sistemasl.ioma.gba.gov.ar/sistemas/meppes/consul_tramite4.php?nro_autorizacion=${numeroAutorizacion}`,
      { waitUntil: 'networkidle2' }
    );

    const response = await page.evaluate(() => {
      return document.querySelectorAll('select')[0].length;
    });

    console.log('getCantidadProvicionesAutorizadas success');

    return response;
  } catch (e) {
    console.log(`Error getCantidadProvicionesAutorizadas: ${e}`);
    return false;
  }
};

const getCantidadProvicionesRechazadas = async (
  browser,
  numeroAutorizacion,
  pathRechazo
) => {
  try {
    const page = await browser.newPage();

    await page.goto(
      `http://sistemasl.ioma.gba.gov.ar/sistemas/meppes/consul_tramite5.php?nro_autorizacion=${numeroAutorizacion}`,
      { waitUntil: 'networkidle2' }
    );

    await page.screenshot({
      path: `${pathRechazo}/ProvicionRechazada.jpg`
    });

    console.log('getCantidadProvicionesRechazadas success');
    return true;
  } catch (e) {
    console.log(`Error getCantidadProvicionesRechazadas: ${e}`);
    return false;
  }
};

const generatePdfProvicion = async (
  browser,
  { numero, numeroProvicion, pathFolderSavePdf }
) => {
  try {
    const page = await browser.newPage();
    await page.goto(
      `http://sistemasl.ioma.gba.gov.ar/sistemas/meppes/imprimir_receta.php?nro_autorizacion=${numero}&provi=${numeroProvicion}`,
      { waitUntil: 'networkidle2' }
    );

    await page.pdf({
      path: `${pathFolderSavePdf}/${numeroProvicion}.pdf`,
      format: 'A4'
    });
    console.log('Generate Pdf Provicion success');
    return true;
  } catch (e) {
    console.log(`Error Generate Pdf Provicion: ${e}`);
    return false;
  }
};

const generateMeppes = async (numeroTramite, usuario, pathSelected, executablePath) => {
  try {
    const browser = await puppeteer.launch({ executablePath:executablePath , headless: true });
    const page = await browser.newPage();
    const region = numeroTramite.substr(0, 2);
    const today = currentDate();
    const objectResponse = {
      tramite: numeroTramite,
      afiliado: '',
      incio: '',
      estado: 'Pendiente',
      autorizaciones: []
    };

    await loginMeppes(page, usuario);
    await searchNumberTramite(page, numeroTramite, region);

    // Devuelve numero de afiliado si existe receta para impresion y observacion si existe
    // Si numero de afiliado es undefined el tramite no esta auditado
    const { fechaInicio, numberAfiliado, observacion } = await viewRecetas(
      page
    );

    if (numberAfiliado) {
      objectResponse.incio = fechaInicio;
      objectResponse.afiliado = numberAfiliado;
      objectResponse.estado = 'Auditado';
      await page.waitForNavigation();
    }

    await createFolder(`${pathSelected}/meppes`);
    await createFolder(`${pathSelected}/meppes/${today}`);

    // Devuelve arreglo con todas las autorizaciones (aprobadas y rechazadas) de un tramite
    const autorizaciones = await getArrayAutorizaciones(page);

    if (autorizaciones) {
      await Promise.all(
        autorizaciones.map(async auto => {
          const { numero, receta, estado } = auto;
          const pathFolderTramite = `${pathSelected}/meppes/${today}/TRAMITE-${numeroTramite}`;
          await createFolder(pathFolderTramite);

          objectResponse.autorizaciones.push({
            numeroAutorizacion: numero,
            numeroReceta: receta,
            estado
          });

          // Proviciones autorizadas
          if (estado) {
            const contadadProviciones = await getCantidadProvicionesAutorizadas(
              page,
              numero
            );
            const pathFolderSavePdf = `${pathFolderTramite}/PROVICION-${numero}`;
            await createFolder(pathFolderSavePdf);
            for (
              let numeroProvicion = 1;
              numeroProvicion <= contadadProviciones;
              numeroProvicion++
            ) {
              await generatePdfProvicion(browser, {
                numero,
                numeroProvicion,
                pathFolderSavePdf
              });
            }
          } else {
            // Creo una carpeta y adentro una captura de pantalla del rechazo
            const pathFolderSaveScreenShot = `${pathFolderTramite}/PROVICION-${numero}`;
            await createFolder(pathFolderSaveScreenShot);
            await getCantidadProvicionesRechazadas(
              browser,
              numero,
              pathFolderSaveScreenShot
            );
          }
        })
      );
    }

    if (observacion) {
      const pathFolderObservaciones = `${pathSelected}/meppes/${today}/TRAMITE-${numeroTramite}/OBSERVACIONES`;
      await createFolder(pathFolderObservaciones);
      const page2 = await browser.newPage();
      const htmlContent = `<body>
            <h1>Numero Tramite: ${numeroTramite}</h1>
            <h1>Observacion: ${observacion}</h1>
          </body>`;
      await page2.setContent(htmlContent);
      await page2.pdf({
        path: `${pathFolderObservaciones}/observacion.pdf`,
        format: 'A4'
      });
    }

    await browser.close();

    return {
      error: false,
      message: `Se descargaron ${objectResponse.autorizaciones.length} recetas autorizadas!`,
      response: objectResponse
    };
  } catch (e) {
    console.log(e);
    return { error: true, message: e.message, response: '' };
  }
};

export default generateMeppes;
