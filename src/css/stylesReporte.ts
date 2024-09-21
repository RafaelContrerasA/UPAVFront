import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 30,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
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
        marginTop: -20,
        maxWidth: '90%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    subtitle: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    rectanglePrincipal: {
        marginTop: 34,
        right: 50,
        width: '100%',
        height: 32,
        backgroundColor: '#6A0F49',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangleTextPincipal: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    rectanglesContainer: {
        flexDirection: 'row',
        marginTop: 0,
        width: '100%',
        justifyContent: 'space-between',
        marginLeft: -50,
        
    },
    rectangleContainer: {
        width: '23%',
        alignItems: 'center',
        marginVertical: 5,
    },
    rectangle: {
        width: '100%',
        backgroundColor: '#FFC3D0',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        height: 50,
    },
    rectangleText: {
        color: 'black',
        fontSize: 9,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    rectangleValue: {
        color: 'black',
        fontSize: 9,
        textAlign: 'center',
        marginTop: 5,
    },
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
        width: '70%',
        height: 'auto',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 10,
        right: 30,
        left: 0,
        textAlign: 'right', // Alinea el texto a la derecha
    },
    footer: {
        fontSize: 7,
        color: 'black',
    },
    graphTitleContainer: {        
        height: 32,
        right: 50,
        backgroundColor: '#6A0F49',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 3,
    },
    graphTitleText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    graphSection: {
        flexDirection: 'column',
        width: '48%',
        marginBottom: 10,
    },
});

export default styles;
