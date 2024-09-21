import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, BarElement, Title, Tooltip, Legend, Filler, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useRef } from 'react';
import { toPng } from 'html-to-image';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);

ChartJS.register(ChartDataLabels);

interface ChartGeneratorProps {
    onImageGenerated: (image: string) => void;
    data: {
        total_reacciones: number;
        total_comentarios: number;
        total_compartidos: number;
        total_publicaciones: number;
    };
}

const ChartGenerator: React.FC<ChartGeneratorProps> = ({ onImageGenerated, data }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const reaccioneslabel = ["Total de reacciones", "Total de comentarios", "Total de compartidos", "Total de publicaciones"];
    const reacciones = [data.total_reacciones, data.total_comentarios, data.total_compartidos, data.total_publicaciones];

    const midata = {
        labels: reaccioneslabel,
        datasets: [
            {
                label: 'Reacciones',
                data: reacciones,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
            }
        ]
    };

    const misoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
                labels: {
                    color: 'rgba(0, 220, 195)'
                }
            },
            tooltip: {
                enabled: true
            },
            datalabels: {
                color: '#fff',
                formatter: (value: number) => { // Especifica el tipo de 'value' como 'number' y 'ctx' como 'any'
                    return `${value}`;
                }
            }
        }
    };

    useEffect(() => {
        if (chartRef.current) {
            toPng(chartRef.current, { backgroundColor: 'white' })
                .then((dataUrl) => {
                    onImageGenerated(dataUrl);
                })
                .catch((err) => {
                    console.error('Falló al generar la imagen', err);
                });
        }
    }, [onImageGenerated, data]);

    return <div ref={chartRef}><Pie data={midata} options={misoptions} /></div>;
};

export default ChartGenerator;
