const czNames = {
  Czechia: 'Česko',
  Hungary: 'Maďarsko',
  Austria: 'Rakousko',
  Germany: 'Německo',
  Slovakia: 'Slovensko',
  Poland: 'Polsko',
};

const colors = {
  Czechia: '#e41a1c',
  Hungary: '#a65628',
  Austria: '#984ea3',
  Germany: '#4daf4a',
  Slovakia: '#ff7f00',
  Poland: '#377eb8',
}

Promise.all([
  fetch('./n95_price.json').then((d) => d.json()),
]).then((res) => {
  const data = res[0];
  const srs = [];
  Object.keys(data).forEach((state) => {
    srs.push({
      name: czNames[state],
      color: colors[state],
      data: data[state].sort((a, b) => a[0] - b[0]),
    });
  });
  Highcharts.chart('cena-benzinu', {
    title: {
      text: 'Cena natural 95',
    },
    subtitle: {
      text: 'v eurech za litr',
    },
    credits: {
      text: 'Zdroj: EU Commision, Weekly Oil Bulletin',
      href: 'https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en',
    },
    yAxis: {
      title: {
        text: 'euro',
      },
    },
    xAxis: {
      accessibility: {
        rangeDescription: 'Range: 2010 to 2017',
      },
      labels: {
        formatter: (v) => {
          const dte = new Date(v.value * 1000);
          return `${dte.getDate()}.  ${dte.getMonth() + 1}. ${dte.getFullYear().toString().slice(2)}`;
        },
      },
    },
    legend: {
      layout: 'horizontal',
    },
    tooltip: {
      formatter: function() {
        const dte = new Date(this.x * 1000);
        let out = `${dte.getDate()}.  ${dte.getMonth() + 1}. ${dte.getFullYear()}`
        this.points.forEach((p) => {
          out += `<br><b style="color:${p.color};">${p.series.name}:</b> ${Math.round(p.y * 10)/10} €`
        })
        return out
      },
      shared: true,
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false,
        },
      },
      series: {
        animation: false,
        label: {
          connectorAllowed: false,
        },
      },
    },

    series: srs,
  });
});
