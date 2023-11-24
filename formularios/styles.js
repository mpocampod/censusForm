import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 
    formulario: {
      color: "black",
      fontSize: 18,
      marginTop: 20,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'center',
    },
   
    nombresyapellidos: {
      color: "darkslategray",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: "black",
      paddingRight: 12,
    }, 
   
    email: {
      color: "darkslategray",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: "black",
      paddingRight: 12,
    }, 
   
    telefono: {
      color: "darkslategray",
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: "black",
      paddingRight: 12,
    },
   
    mensaje: {
      color: "darkslategray",
      fontSize: 18,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: "black",
      paddingRight: 12,
    },
   
    colorBtn: {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 7,
    },
   
    colorTxtBtn: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },

    containerStyle: {
      backgroundColor: '#CDE6F0',
      flex: 1,
    },
    
    textTitleStyle: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20, 
    },
    
    boldTextStyle: {
      color: 'black',
      fontWeight: 'bold',
    },

    boxContainerStyle: {
      backgroundColor: '#85C6E3', 
      padding: 20, 
      borderRadius: 10, 
      margin: 10, 
    },
    
    radioButtonContainer: {
      flexDirection: "column", // Alinea los botones y los textos en una columna
      marginVertical: 5,
    },
    radioButtonRow: {
      flexDirection: "row", // Coloca los botones y los textos en una fila
    },
    radioButtonColumn: {
      flexDirection: "column", // Coloca los botones en una columna
      alignItems: "flex-start", // Alinea a la izquierda
    },
    radioButtonItem: {
      height: 14,
      width: 14,
      backgroundColor: "#CDE6F0",
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "#687685",
      marginBottom: 20,
    },
    radioButtonItemSelected: {
      backgroundColor: "#3478F5",
    },
    radioTextColumn: {
      flexDirection: "column", // Coloca los textos en una columna
      marginLeft: 10, // Espacio entre la columna de botones y la columna de textos
    },
  });