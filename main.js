const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');
const si = require('systeminformation');

// Собираем данные о системе
async function getSystemInfo() {
  // Получаем оригинальные интерфейсы
  const rawNet = os.networkInterfaces();
  // Очищаем от IPv6
  const filteredNet = {};
  for (const [iface, arr] of Object.entries(rawNet)) {
    const onlyV4 = arr.filter(item => item.family === 'IPv4');
    if (onlyV4.length > 0) filteredNet[iface] = onlyV4;
  }

  // Получаем информацию о дисках и разделах
  let disks = [];
  let blockDevices = [];
  try {
    disks = await si.fsSize();
    blockDevices = await si.blockDevices();
  } catch (e) {
    disks = [{ error: e.message }];
    blockDevices = [{ error: e.message }];
  }

  return {
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    hostname: os.hostname(),
    username: os.userInfo().username,
    homedir: os.homedir(),
    cpus: os.cpus().map(cpu => cpu.model),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    uptime: os.uptime(),
    network: filteredNet,
    disks,
    blockDevices,
    tmpdir: os.tmpdir(),
    type: os.type(),
    endianness: os.endianness(),
    loadavg: os.loadavg(),
    // Можно добавить еще нужные поля
  };
}

(async () => {
  const data = await getSystemInfo();
  const templatePath = path.join(__dirname, 'index_template.html');
  let html = fs.readFileSync(templatePath, 'utf-8');
  const dataScript = `<script>window.hardData = ${JSON.stringify(data, null, 2)};<\/script>`;
  html = html.replace('<!--HARDDATA-->', dataScript);
  // Генерируем имя файла с 16-битным таймштампом
  const ts16 = (Date.now() & 0xFFFF).toString(16).padStart(4, '0');
  const htmlPath = path.join(process.cwd(), `sysinfo_${ts16}.html`);
  fs.writeFileSync(htmlPath, html, 'utf-8');
  exec(`start "" "${htmlPath}"`);
})();