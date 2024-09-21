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
    Filler
);

interface ChartGeneratorProps {
    onImageGenerated: (image: string) => void;
    data: { [week: string]: number }; // Semanas dinámicas
}

const ChartGeneratorSemanas: React.FC<ChartGeneratorProps> = ({ onImageGenerated, data }) => {
    const chartRef = useRef<HTMLDivElement>(null);
    const semanaslabel = Object.keys(data);
    const publicaciones = Object.values(data);
    const mayor = Math.max(...publicaciones);

    const midata = {
        labels: semanaslabel,
        datasets: [
            {
                label: 'Publicaciones por semana',
                data: publicaciones,
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
                    color: 'rgba(0, 220, 195)'
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

    return <div ref={chartRef}><Bar data={midata} options={misoptions} /></div>;
};

export default ChartGeneratorSemanas;
