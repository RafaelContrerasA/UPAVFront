import React from 'react';
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
    const currentDate = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
                    <View style={styles.rectanglePrincipal}>
                        <Text style={styles.rectangleTextPincipal}>INFORMACIÓN GENERAL DEL MES DE ABRIL</Text>
                    </View>
                    <View style={styles.rectanglesContainer}>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de reacciones</Text>
                            <Text style={styles.rectangleValue}>{total_reacciones}</Text>
                        </View>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de comentarios</Text>
                            <Text style={styles.rectangleValue}>{total_comentarios}</Text>
                        </View>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de compartidos</Text>
                            <Text style={styles.rectangleValue}>{total_compartidos}</Text>
                        </View>
                        <View style={styles.rectangle}>
                            <Text style={styles.rectangleText}>Total de publicaciones</Text>
                            <Text style={styles.rectangleValue}>{total_publicaciones}</Text>
                        </View>
                    </View>
                    <View style={styles.imageGrid}>
                        <View style={styles.graphSection}>
                            <View style={styles.graphTitleContainer}>
                                <Text style={styles.graphTitleText}>Gráfico general</Text>
                            </View>
                            {chartImageGeneral && <Image src={chartImageGeneral} style={styles.image} />}
                        </View>
                        <View style={styles.graphSection}>
                            <View style={styles.graphTitleContainer}>
                                <Text style={styles.graphTitleText}>Gráfico de reacciones</Text>
                            </View>
                            {chartImageReacciones && <Image src={chartImageReacciones} style={styles.image} />}
                        </View>
                        <View style={styles.graphSection}>
                            <View style={styles.graphTitleContainer}>
                                <Text style={styles.graphTitleText}>Gráfico de la publicación más popular del mes</Text>
                            </View>
                            {chartImagePopular && <Image src={chartImagePopular} style={styles.image} />}
                        </View>
                        <View style={styles.graphSection}>
                            <View style={styles.graphTitleContainer}>
                                <Text style={styles.graphTitleText}>Gráfico de publicaciones semanales</Text>
                            </View>
                            {chartImageSemanas && <Image src={chartImageSemanas} style={styles.image} />}
                        </View>
                    </View>
                </View>
                <Text style={styles.footer}>Información creada el día {currentDate}</Text>
            </Page>
        </Document>
    );
};

const generatePdf = (reporte: Reporte) => {
    return <MyDocument {...reporte} />;
};

export default generatePdf;


-------------ESTILOS-------------
import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        marginLeft: 10,
    },
    logo: {
        width: 30,
        height: 45,
    },
    bold: {
        fontWeight: 'bold',
    },
    title: {
        fontSize: 12,
        marginTop: -22,
        maxWidth: '90%',
        overflow: 'hidden',
        textOverflow: 'ellipsis', // Agrega puntos suspensivos para indicar texto truncado
        whiteSpace: 'nowrap',
    },
    tittle2: {
        fontSize: 11,
        fontWeight: 'bold',
        marginTop: -22,
    },
    subtitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    rectanglePrincipal: {
        marginTop: 30,
        right: 50,
        width: '100%',
        height: '3%',
        backgroundColor: '#6A0F49',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectanglesContainer: {
        flexDirection: 'row',
        marginTop: 10,
        width: '100%',
        justifyContent: 'space-between',
        marginLeft: -35,
    },
    rectangleContainer: {
        marginBottom: 10, // Espacio entre cada cuadro y el siguiente
    },
    rectangle: {
        right: 15,
        width: '22%',
        height: '400%',
        backgroundColor: '#FFC3D0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleTextPincipal: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
    rectangleText: {
        color: 'black',
        fontSize: 9,
        fontWeight: 'bold',
    },
    
    // New styles for image grid
    imageGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    imageContainer: {
        width: '48%',
        marginBottom: 10,
    },
    image: {
        width: '100%',
    },
});

export default styles;