import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';

interface AllReactions {
    me_gusta: number;
    me_encanta: number;
    me_divierte: number;
    me_asombra: number;
    me_entristece: number;
    me_enoja: number;
    me_importa: number;
    total: number;
}

interface GraficaFiltroProps {
    totalReacciones: AllReactions;
}

const GraficaFiltro: React.FC<GraficaFiltroProps> = ({ totalReacciones }) => {
    useEffect(() => {
        const options1 = {
            chart: {
                height: 400,
                width: 400,
                type: "donut",
            },
            series: [
                totalReacciones.me_gusta,
                totalReacciones.me_encanta,
                totalReacciones.me_divierte,
                totalReacciones.me_asombra,
                totalReacciones.me_entristece,
                totalReacciones.me_enoja,
                totalReacciones.me_importa
            ],
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        total: {
                            show: true,
                            label: 'TOTAL'
                        }
                    }
                }
            },
            labels: ['Me Gusta', 'Me Encanta', 'Me Divierte', 'Me Asombra', 'Me Entristece', 'Me Enoja', 'Me Importa']
        };

        const options2 = {
            chart: {
                height: 400,
                width: 400,
                type: "bar",
            },
            series: [{
                data: [
                    totalReacciones.me_gusta,
                    totalReacciones.me_encanta,
                    totalReacciones.me_divierte,
                    totalReacciones.me_asombra,
                    totalReacciones.me_entristece,
                    totalReacciones.me_enoja,
                    totalReacciones.me_importa
                ]
            }],
            plotOptions: {
                bar: {
                    distributed: true
                }
            },
            xaxis: {
                categories: ['Me Gusta', 'Me Encanta', 'Me Divierte', 'Me Asombra', 'Me Entristece', 'Me Enoja', 'Me Importa']
            },
            dataLabels: {
                enabled: true
            },
            title: {
                text: 'Reacciones por tipo'
            }
        };

        const chart1 = new ApexCharts(document.querySelector("#chart1"), options1);
        const chart2 = new ApexCharts(document.querySelector("#chart2"), options2);

        chart1.render();
        chart2.render();

        return () => {
            chart1.destroy();
            chart2.destroy();
        };
    }, [totalReacciones]);

    return (
        
            <div>
                
                <div id="chart2"></div>
                <div id="chart1"></div>
            </div>
        
    );
};

export default GraficaFiltro;
