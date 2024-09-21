import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { toPng } from 'html-to-image';
import './../../css/styleIcons.css';  // Asegúrate de importar tu archivo de estilos

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

import MeGusta from '/icons/me_gusta.svg';
import MeEncanta from '/icons/me_encanta.svg';
import MeImporta from '/icons/me_importa.svg'
import MeDivierte from '/icons/me_divierte.svg';
import MeAsombra from '/icons/me_asombra.svg';
import MeEntristece from '/icons/me_entristece.svg';
import MeEnoja from '/icons/me_enoja.svg';

interface ChartGeneratorProps {
    onImageGenerated: (image: string) => void;
    data: {
        gusta: number;
        encanta: number;
        importa: number;
        divierte: number;
        asombra: number;
        entristece: number;
        enoja: number;
    };
}

const ChartGenerator: React.FC<ChartGeneratorProps> = ({ onImageGenerated, data }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    // Ruta de las imágenes SVG
    const imagePaths = [MeGusta, MeEncanta, MeImporta, MeDivierte, MeAsombra, MeEntristece, MeEnoja];

    const reacciones = [data.gusta, data.encanta, data.importa, data.divierte, data.asombra, data.entristece, data.enoja];
    const mayor = Math.max(...reacciones);

    const midata = {
        labels: reacciones.map((_, index) => index.toString()), // Etiquetas como índices
        datasets: [
            {
                label: 'Reacciones',
                data: reacciones,
                backgroundColor: 'rgba(0, 220, 195, 0.5)'
            }
        ]
    };

    const misoptions = {
        responsive: true,
        animation: {
            duration: 0
        },
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                min: 0,
                max: mayor,
                ticks: {
                    color: 'rgba(0, 220, 195)'
                }
            },
            x: {
                ticks: {
                    color: 'rgba(0, 220, 195)',
                    callback: function() {
                        return ''; // Devuelve una cadena vacía
                    },
                    autoSkip: false
                }
            }
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            toPng(chartRef.current, { backgroundColor: 'white' })
                .then((dataUrl) => {
                    onImageGenerated(dataUrl);
                    console.log('¡La imagen se ha generado correctamente!');
                })
                .catch((err) => {
                    console.error('Falló al generar la imagen', err);
                });
        }
    }, [onImageGenerated, data]);

    return (
        <div ref={chartRef} style={{ position: 'relative' }}>
            <Bar data={midata} options={misoptions} />
            {/* Contenedor de las imágenes */}
            <div className="chart-labels">
                {imagePaths.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt=""
                        className="chart-label"
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: `${(index + 1) / reacciones.length * 100}%`, // Ajusta la posición de los íconos
                            transform: 'translateX(-50%)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default ChartGenerator;
