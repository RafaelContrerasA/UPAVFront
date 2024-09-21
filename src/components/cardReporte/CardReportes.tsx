import { useState } from 'react';
import { MdFileDownload } from "react-icons/md";
import { VscEye } from "react-icons/vsc";
import generatePdf from './pdfGenerator';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ChartGeneratorGeneral from './ChartGeneratorGeneral';
import ChartGeneratorReacciones from './ChartGeneratorReacciones';
import ChartGeneratorPopular from './ChartGeneratorPopular';
import ChartGeneratorSemanas from './ChartSemanal';
import ChartPopularReacciones from './ChartGeneratorReacciones';

interface Reporte {
  id: string;
  nombre: string;
  pertenecea: number;
  tipo_reporte: string;
  fecha: string;
  total_reacciones: number;
  total_comentarios: number;
  total_compartidos: number;
  total_publicaciones: number;
  gusta: number;
  encanta: number;
  importa: number;
  divierte: number;
  asombra: number;
  entristece: number;
  enoja: number;

  nombre_popular: string;
  total_reacciones_popular: number;
  total_comentarios_popular: number;
  total_compartidos_popular: number;

  gusta_popular: number;
  encanta_popular: number;
  importa_popular: number;
  divierte_popular: number;
  asombra_popular: number;
  entristece_popular: number;
  enoja_popular: number;

  chartImageGeneral?: string;
  chartImageReacciones?: string;

  chartImagePopular?: string;
  chartImagePopularReacciones?: string;

  chartImageSemanas?: string;
}

const CardReportes = ({ reporte }: { reporte: Reporte }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chartImageGeneral, setChartImageGeneral] = useState<string | null>(null);
  const [chartImageReacciones, setChartImageReacciones] = useState<string | null>(null);
  const [chartImagePopular, setChartImagePopular] = useState<string | null>(null);
  const [chartImageSemanas, setChartImageSemanas] = useState<string | null>(null);
  const [chartImagePopularReacciones, setChartImagePopularReacciones] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleImageGeneratedGeneral = (image: string) => {
    setChartImageGeneral(image);
  };

  const handleImageGeneratedReacciones = (image: string) => {
    setChartImageReacciones(image);
  };

  const handleImageGeneratedPopular = (image: string) => {
    setChartImagePopular(image);
  };

  const handleImageGeneratedSemanas = (image: string) => {
    setChartImageSemanas(image);
  };

  const handleImageGeneratedReaccionesSemanal = (image: string) => {
    setChartImagePopularReacciones(image);
  };

  const reporteConImagen = {
    ...reporte,
    chartImageGeneral: chartImageGeneral ?? undefined,
    chartImageReacciones: chartImageReacciones ?? undefined,
    chartImagePopular: chartImagePopular ?? undefined,
    chartImageSemanas: chartImageSemanas ?? undefined,
    chartImagePopularReacciones: chartImagePopularReacciones ?? undefined,
  };

  reporte.total_reacciones = reporte.gusta + reporte.encanta + reporte.importa + reporte.divierte + reporte.asombra + reporte.entristece + reporte.enoja;

  // Datos de semanas (esto debería calcularse dinámicamente basado en las publicaciones reales)
  const semanasData = {
    'Semana 1': 10,
    'Semana 2': 15,
    'Semana 3': 8,
    'Semana 4': 20,
  };

  return (
    <div className="w-full flex justify-between items-center p-4 bg-white rounded-lg shadow border hover:bg-custom-rosa hover:bg-opacity-40 border-black">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="w-8 h-8 fill-gray-500 bg-slate-00 scale-150" />
        <span className="text-lg font-medium font-gibson leading-tight">
          <div className="bg-opacity-0 w-fit flex flex-col gap-2 rounded-3xl">
            <p className="text-sm font-bold leading-none">Reporte {reporte.nombre}</p>
            <p className="text-sm font-normal leading-none"><span className="font-semibold">Tipo:</span> {reporte.tipo_reporte}</p>
            <p className='text-sm font-normal leading-none'><span className='font-semibold'>Fecha:</span> {reporte.fecha}</p>
          </div>
        </span>
      </div>
      <div className="flex gap-4">
        <button className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-rosa hover:bg-opacity-15 transition-all duration-200"
          onClick={handleOpenModal}>
          <VscEye className='fill-custom-vino w-6 h-6 hover:fill-custom-guinda' />
        </button>
        <PDFDownloadLink document={generatePdf(reporteConImagen)} fileName={`Reporte_${reporte.nombre}.pdf`}>
          {({ loading }) => (
            <button className="inline-flex items-center justify-center p-2 rounded-md hover:bg-custom-rosa hover:bg-opacity-15 transition-all duration-200">
              {loading ? "Descargando..." : <MdFileDownload className="w-5 h-5 fill-custom-vino" />}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto">
          <div className="bg-white p-6 rounded shadow max-h-full overflow-auto">
            <button className="flex items-center justify-center px-5 py-3 bg-custom-rosa bg-opacity-60 backdrop-filter backdrop-blur-sm hover:bg-custom-guinda hover:bg-opacity-60 text-custom-vino font-gibson text-sm font-semibold hover:text-white rounded-lg cursor-pointer transition-colors duration-300"
              onClick={handleCloseModal}>Cerrar</button>
            <div style={{ width: '100vw', height: '100vh' }}>
              <PDFViewer width="100%" height="100%">
                {generatePdf(reporteConImagen)}
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
      <div style={{ position: 'absolute', top: '-9999px' }}>
        <ChartGeneratorReacciones onImageGenerated={handleImageGeneratedReacciones} data={{
          gusta: reporte.gusta,
          encanta: reporte.encanta,
          importa: reporte.importa,
          divierte: reporte.divierte,
          asombra: reporte.asombra,
          entristece: reporte.entristece,
          enoja: reporte.enoja,
        }} />
        <ChartGeneratorGeneral onImageGenerated={handleImageGeneratedGeneral} data={{
          total_reacciones: reporte.total_reacciones,
          total_comentarios: reporte.total_comentarios,
          total_compartidos: reporte.total_compartidos,
          total_publicaciones: reporte.total_publicaciones,
        }} />
        <ChartGeneratorPopular onImageGenerated={handleImageGeneratedPopular} data={{
          nombre_popular: reporte.nombre_popular,
          total_reacciones: reporte.total_reacciones_popular,
          total_comentarios: reporte.total_comentarios_popular,
          total_compartidos: reporte.total_compartidos_popular,
        }} />
        {reporte.tipo_reporte === 'Semanal' ? (
          <ChartPopularReacciones onImageGenerated={handleImageGeneratedReaccionesSemanal} data={{
            gusta: reporte.gusta_popular,
            encanta: reporte.encanta_popular,
            importa: reporte.importa_popular,
            divierte: reporte.divierte_popular,
            asombra: reporte.asombra_popular,
            entristece: reporte.entristece_popular,
            enoja: reporte.enoja_popular,
          }} />
        ) : (
          <ChartGeneratorSemanas onImageGenerated={handleImageGeneratedSemanas} data={semanasData} />
        )}
      </div>
    </div>
  );
};

export default CardReportes;
