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
    nombre_popular?: string;
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
    chartImageSemanas,
    nombre_popular,
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
                    {tipo_reporte === 'Semanal' ? (
                        <View style={styles.rectanglePrincipal}>
                            <Text style={styles.rectangleTextPincipal}>INFORMACIÓN GENERAL DE LA SEMANA {fecha}</Text>
                        </View>) : (
                        <>
                            <View style={styles.rectanglePrincipal}>
                                <Text style={styles.rectangleTextPincipal}>INFORMACIÓN GENERAL DEL MES DE ABRIL</Text>
                            </View>
                        </>
                    )}

                    <View style={styles.rectanglesContainer}>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}>
                                <Text style={styles.rectangleText}>Total de reacciones</Text>
                            </View>
                            <Text style={styles.rectangleValue}>{total_reacciones}</Text>
                        </View>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}>
                                <Text style={styles.rectangleText}>Total de comentarios</Text>
                            </View>
                            <Text style={styles.rectangleValue}>{total_comentarios}</Text>
                        </View>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}>
                                <Text style={styles.rectangleText}>Total de compartidos</Text>
                            </View>
                            <Text style={styles.rectangleValue}>{total_compartidos}</Text>
                        </View>
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle}>
                                <Text style={styles.rectangleText}>Total de publicaciones</Text>
                            </View>
                            <Text style={styles.rectangleValue}>{total_publicaciones}</Text>
                        </View>
                    </View>
                    <Text style={styles.rectangleText}>Información recopilada de la página oficial de Facebook de la dependencia {nombre}. Se muestran cuatro 
                    diferentes gráficos; donde el gráfico general muestra el total de publicaciones, reacciones, comentarios, compartidos que se obtuvieron de</Text>
                    {tipo_reporte === 'Semanal' ? (
                        <View style={{ ...styles.rectanglePrincipal, marginTop: '10', backgroundColor: 'rgba(109, 128, 127, 0.2)' }}>
                            <Text style={{ ...styles.rectangleTextPincipal, color: '#6A0F49' }}>GRÁFICOS DE LA INFORMACIÓN SEMANAL</Text>
                        </View>) : (
                        <>
                            <View style={{ ...styles.rectanglePrincipal, marginTop: '10', backgroundColor: 'rgba(109, 128, 127, 0.2)' }}>
                                <Text style={{ ...styles.rectangleTextPincipal, color: '#6A0F49' }}>GRÁFICOS DE LA INFORMACIÓN MENSUAL</Text>
                            </View>
                        </>
                    )}
                    <View style={styles.imageGrid}>
                        <View style={styles.graphSection}>
                            <View style={{ ...styles.graphTitleContainer, marginTop: '-15' }}>
                                <Text style={styles.graphTitleText}>Gráfico general</Text>
                            </View>
                            {chartImageGeneral && <Image src={chartImageGeneral} style={styles.image} />}
                        </View>
                        <View style={styles.graphSection}>
                            <View style={{ ...styles.graphTitleContainer, marginTop: '-15' }}>
                                <Text style={styles.graphTitleText}>Gráfico de reacciones</Text>
                            </View>
                            {chartImageReacciones && <Image src={chartImageReacciones} style={styles.image} />}
                        </View>
                        <>
                            {tipo_reporte === 'Semanal' ? (
                                <>
                                    <View style={{ ...styles.rectanglePrincipal, marginTop: '10', backgroundColor: 'rgba(109, 128, 127, 0.2)' }}>
                                        <Text style={{ ...styles.rectangleTextPincipal, color: '#6A0F49' }}>{nombre_popular?.toUpperCase()}</Text>
                                    </View>
                                    <View style={styles.graphSection}>
                                        <View style={{ ...styles.graphTitleContainer, marginTop: '5' }}>
                                            <Text style={styles.graphTitleText}>Gráfico de la publicación más popular de la semana</Text>
                                        </View>
                                        {chartImagePopular && <Image src={chartImagePopular} style={styles.image} />}
                                    </View>

                                    <View style={styles.graphSection}>
                                        <View style={{ ...styles.graphTitleContainer, marginTop: '5' }}>
                                            <Text style={styles.graphTitleText}>Gráfico de reacciones de la publicacion popular</Text>
                                        </View>
                                        {chartImagePopularReacciones && <Image src={chartImagePopularReacciones} style={styles.image} />}
                                    </View>
                                </>
                            ) : (
                                <>
                                    <View style={{ ...styles.rectanglePrincipal, marginTop: '10', backgroundColor: 'rgba(109, 128, 127, 0.2)' }}>
                                        <Text style={{ ...styles.rectangleTextPincipal, color: '#6A0F49' }}>PUBLICACIÓN MÁS POPULAR Y PUBLICACIONES POR SEMANA</Text>
                                    </View>
                                    <View style={styles.graphSection}>
                                        <View style={{ ...styles.graphTitleContainer, marginTop: '5' }}>
                                            <Text style={styles.graphTitleText}>Gráfico de la publicación más popular del mes</Text>
                                        </View>
                                        {chartImagePopular && <Image src={chartImagePopular} style={styles.image} />}
                                        <Text style={styles.rectangleValue}>Publciación: {nombre_popular}</Text>
                                    </View>
                                    <View style={styles.graphSection}>
                                        <View style={{ ...styles.graphTitleContainer, marginTop: '5' }}>
                                            <Text style={styles.graphTitleText}>Gráfico de publicaciones semanales</Text>
                                        </View>
                                        {chartImageSemanas && <Image src={chartImageSemanas} style={styles.image} />}
                                    </View>
                                </>
                            )}
                        </>
                    </View>
                    <View style={styles.footerContainer}>
                        <Text style={{ ...styles.footer, textAlign: 'center' }}>Página 1</Text>
                        <Text style={styles.footer}>Información creada el día {currentDate}.</Text>
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
