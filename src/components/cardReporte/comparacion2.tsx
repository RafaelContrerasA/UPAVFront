import { Document, Page, Text, View, Image } from '@react-pdf/renderer';
import LOGOMICH from './../User/LOGOMICH.png';
import styles from '../../css/stylesReporte';

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
    chartImageGeneral?: string;
    chartImageReacciones?: string;
    chartImagePopular?: string;
    chartImagePopularReacciones?: string;
    chartImageSemanas?: string;
}

const getReportTitle = (type: string, dateRange: string) => {
    const startDateString = dateRange.split(' - ')[0];
    const startDateParts = startDateString.split('/');
    const startDate = new Date(
        parseInt(startDateParts[2]), // Año
        parseInt(startDateParts[1]) - 1, // Mes 
        parseInt(startDateParts[0]) // Día
    );

    const startMonth = startDate.toLocaleString('default', { month: 'long' });
    const capitalizedMonth = startMonth.charAt(0).toUpperCase() + startMonth.slice(1);

    if (type === 'diario') {
        return `Reporte diario - ${capitalizedMonth}`;
    } else if (type === 'Mensual') {
        return `Reporte Mensual - ${capitalizedMonth}`;
    } else if (type === 'Semanal') {
        return `Reporte Semanal - ${capitalizedMonth}`;
    } else {
        return `Reporte ${type}`;
    }
};

const MyDocument = ({
    nombre,
    total_reacciones,
    total_comentarios,
    total_compartidos,
    total_publicaciones,
    tipo_reporte,
    fecha,
    chartImageGeneral,
    chartImageReacciones,
    chartImagePopular,
    chartImagePopularReacciones,
    chartImageSemanas
}: Reporte) => {
    return (
        <Document>
            <Page size="LETTER" style={styles.page}>
                <Image src={LOGOMICH} style={styles.logo} />
                <View style={styles.section}>
                    <Text style={styles.title}>
                        {getReportTitle(tipo_reporte, fecha)}
                        {" | "}
                        <Text style={styles.bold}>{nombre}</Text>
                    </Text>
                    <Text style={styles.subtitle}>{nombre}</Text>
                    <View style={styles.rectanglePrincipal}>y
                        <Text style={styles.rectangleTextPincipal}>INFORMACIÓN GENERAL DEL MES DE ABRIL</Text>
                    </View>
                    <View style={styles.rectanglesContainer}>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de reacciones:</Text>
                        </View>
                        <Text style={styles.rectangleText }>{total_reacciones}</Text>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de comentarios: {total_comentarios}</Text>
                        </View>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de compartidos: {total_compartidos}</Text>
                        </View>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de publicaciones: {total_publicaciones}</Text>
                        </View>
                    </View>
                    <View style={styles.imageGrid}>
                        {chartImageGeneral && <Image src={chartImageGeneral} style={{ width: '35%', margin: '10px auto' }} />}
                        {chartImageReacciones && <Image src={chartImageReacciones} style={{ width: '35%', margin: '10px auto' }} />}
                        {chartImagePopular && <Image src={chartImagePopular} style={{ width: '35%', margin: '10px auto' }} />}
                        {tipo_reporte === 'Semanal' ? (
                            chartImagePopularReacciones && <Image src={chartImagePopularReacciones} style={{ width: '35%', margin: '10px auto' }} />
                        ) : (
                            <>
                                {chartImageSemanas && <Image src={chartImageSemanas} style={{ width: '35%', margin: '10px auto' }} />}
                            </>
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

const generatePdf = (reporte: Reporte) => {
    return <MyDocument {...reporte} />;
};

export default generatePdf;