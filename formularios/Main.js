import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView,  StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useRouter,  RouterProvider  } from 'expo-router';
import { styles } from "./styles";
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const Main = ({}) => {
  const router = useRouter();
  const navigation = useNavigation();
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedOptions, setSelectedOptions] = useState(new Set());
  const [selectedValue, setSelectedValue] = useState('');

  const additionalPeopleBoolean = selectedOptions.has('No hay personas adicionales');
  const sendFormDataToDjango = async (formData) => {
    try {
      const response = await fetch('http://192.168.1.3:8000/respondent/prueba/census-forms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question1: formData.numberOfPeople,
          additional_people: additionalPeopleBoolean,
          housing_type: formData.selectedValue,
          phone_number: formData.phoneNumber,
          /*census_form: {
      
          },
          people: [
            {
              first_name: formData.nombresyapellidos.split(' ')[0],
              last_name: formData.nombresyapellidos.split(' ')[1],
              sex: formData.sexo,
              age: formData.edad,
              birth_month: formData.fechaNacimiento.split('/')[0],
              birth_day: formData.fechaNacimiento.split('/')[1],
              birth_year: formData.fechaNacimiento.split('/')[2],
              hispanic_origin: formData.origen,
              hispanic_origin_text: formData.raza,
            },
          ],
          */
        }),
      });
  
      if (response.ok) {
        console.log('Datos enviados con éxito');
      } else {
        console.error('Error al enviar los datos a Django');
      }
    } catch (error) {
      console.error('Error de red', error);
    }
  };


  const handleNext = () => {
      console.log('1:', numberOfPeople);
      console.log('2:', additionalPeopleBoolean);
      console.log('3:', selectedValue);
      console.log('4:', phoneNumber);
     
        if (!isNaN(numberOfPeople) && numberOfPeople > 0) {
          
          navigation.navigate('censoForm', { numberOfPeople: parseInt(numberOfPeople) });
        } else {
         
          alert('Ingrese un número de personas válido.');
        }
      };


  return (
  
    <ScrollView >
      <View style={styles.containerStyle}>
        
      <Text style={styles.textTitleStyle}>Censo de Personas</Text>
        <View style={{ padding: 20 }}>
        <View style={styles.boxContainerStyle}>

          <Text style={styles.boldTextStyle}>
            Antes de responder la primera pregunta, cuenta las personas que viven en esta casa, apartamento o casa rodante usando nuestras guías.
            {'\n\n'}
            * Cuenta todas las personas, incluyendo bebés. Quien vive y duerme acá casi todo el tiempo.
            {'\n'}
            * Si alguno que no tenga un lugar permanente para dormir, se ha quedado el 24 de noviembre de 2023, cuenta esa persona.
            {'\n\n'}
            Las conductas del censo cuenta también instituciones y otros lugares, entonces:
            {'\n'}
            * No cuentes cualquiera que viva lejos de acá, ya sea en la universidad o fuerzas armadas.
            {'\n'}
            * No cuente a nadie en un hogar de ancianos, prisión, cárcel, centro de detención, etc
            {'\n'}
            * Deje fuera de su cuestionario a estas personas, incluso si regresarán a vivir aquí después de salir de la universidad, el hogar de ancianos, el servicio militar, la cárcel, etc. De lo contrario, podrían ser contados dos veces.
            {'\n\n'}
          </Text>
        </View>

          <Text style={styles.boldTextStyle}>1. ¿Cuántas personas vivian o estaban en esta casa, apartamento o casa rodante el 24 de noviembre de 2023? {'\n'}</Text>
            <TextInput
              keyboardType="numeric"
              placeholder="Número de personas "
              value={numberOfPeople}
              onChangeText={(text) => setNumberOfPeople(text)}
            />

          <Text style={styles.boldTextStyle}>{'\n\n'} 2. ¿Había alguna persona adicional alojada aquí el 24 de noviembre 2023 que no incluyó en la Pregunta 1?</Text>
              <Text> {'\n'}Marca con x todas las que apliquen  {'\n'}</Text>
                {[' Niños, ya sea relacionados o no, como recién nacidos, nietos o hijos adoptivos', 
                ' Familiares, como hijos adultos, primos o cuñados',
                ' No familiares, como compañeros de cuarto o niñeras que viven aquí', 
                ' Personas que se quedan temporalmente',
                ' No hay personas adicionales'].map((option) => (
              <View key={option} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
                  <Checkbox 
                   value={selectedOptions.has(option)}
                   onValueChange={() => {
                     const updatedOptions = new Set(selectedOptions);
                       if (selectedOptions.has(option)) {
                        updatedOptions.delete(option);
                        } else {
                        updatedOptions.add(option);
                        }
                        setSelectedOptions(updatedOptions);
                      }}
                      />
                    <Text>{option}</Text>
               </View>
             ))}
          
          
          <Text style={styles.boldTextStyle}>{'\n\n'}3. ¿Esta casa, apartamento o casa rodante es propia o alquilada? {'\n'}</Text>
          <View>
            <RadioButton.Group
              onValueChange={(value) => {
                setSelectedValue(value);
              }}
              value={selectedValue}
            >  
              <View style={styles.radioButtonContainer}>
                <View style={styles.radioButtonRow}>
                  <View style={styles.radioButtonColumn}>
                    <RadioButton.Item
                      label=""
                      value="ownedWithMortgage" 
                      style={[
                        styles.radioButtonItem,
                        selectedValue === "ownedWithMortgage" && styles.radioButtonItemSelected,
                      ]}
                      status={selectedValue === "ownedWithMortgage" ? 'checked' : 'unchecked'}
                      onValueChange={() => setSelectedValue("ownedWithMortgage")}
  
                    />
                    <RadioButton.Item
                      label=""
                      value="ownedWithoutMortgage"
                      style={[
                        styles.radioButtonItem,
                        selectedValue === "ownedWithoutMortgage" && styles.radioButtonItemSelected,
                      ]}
                      status={selectedValue === "ownedWithoutMortgage" ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                      label=""
                      value="rented"
                      style={[
                        styles.radioButtonItem,
                        selectedValue === "rented" && styles.radioButtonItemSelected,
                      ]}
                      status={selectedValue === "rented" ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                      label=""
                      value="occupiedWithoutRent"
                      style={[
                        styles.radioButtonItem,
                        selectedValue === "occupiedWithoutRent" && styles.radioButtonItemSelected,
                      ]}
                      status={selectedValue === "occupiedWithoutRent" ? 'checked' : 'unchecked'}
                    />
                  </View>
                  <View style={styles.radioTextColumn}>
                    <Text>Es propiedad de alguien en este hogar con una hipoteca o préstamo. </Text>
                    <Text>Es propiedad libre y sin deudas. {'\n'}</Text>
                    <Text>Alquilada {'\n'}</Text>
                    <Text>Ocupada sin pago de alquiler</Text>
                  </View>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <Text style={styles.boldTextStyle}>{'\n\n'}4. ¿Cuál es tu celular? {'\n\n'}</Text>
            <TextInput
              value={phoneNumber}
              onChangeText={text => setPhoneNumber(text)}
              placeholder="Celular"
              keyboardType="numeric"
              onSubmit={(values) => sendFormDataToDjango(values)}
            />
          <Button title="Siguiente" onPress={handleNext} />
        </View>
      </View>
    </ScrollView>

  );
};

export default Main;
