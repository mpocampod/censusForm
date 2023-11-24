import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { styles } from "../formularios/styles";
import { ScrollView } from 'react-native-gesture-handler';


const sendFormDataToDjango = async (formData) => {
  try {
    const response = await fetch('http://192.168.1.3:8000/respondent/prueba/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question1: formData.numberOfPeople,
        additional_people: formData.selectedOptions,
        housing_type: formData.selectedValue,
        phone_number: formData.phoneNumber,
        census_form: {
    
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

const CensoForm = ({ route }) => {
  const { numberOfPeople } = route.params;

  const renderPersonForms = () => {
    const personForms = [];
    for (let i = 1; i <= numberOfPeople; i++) {
      personForms.push(
        <View key={i}>
          <Text style={styles.formulario}>Formulario de Persona {i}</Text>
          <Formik
            validateOnMount={true}
            validationSchema={loginValidationSchema}
            initialValues={{
              nombresyapellidos: '',
              sexo: '',
              edad: '',
              fechaNacimiento: '',
              origen: '',
              raza: '',
              
            }}
            onSubmit={(values) => sendFormDataToDjango(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <>
                <TextInput
                  style={styles.nombresyapellidos}
                  placeholder="Nombre de la Persona"
                  onChangeText={handleChange('nombresyapellidos')}
                  onBlur={handleBlur('nombresyapellidos')}
                  value={values.nombresyapellidos}
                  keyboardType="default"
                />
                {errors.nombresyapellidos && touched.nombresyapellidos && (
                  <Text style={styles.errorText}>
                    {errors.nombresyapellidos}
                  </Text>
                )}

                <Text style={styles.formLabel}>Sexo</Text>
                <View style={styles.radioButtonContainer}>
                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor: values.sexo === 'Femenino' ? 'blue' : 'white',
                    },
                  ]}
                  onPress={() => handleChange('sexo')('Femenino')}
                >
                  <Text style={styles.radioButtonText}>Femenino</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.radioButton,
                    {
                      backgroundColor: values.sexo === 'Masculino' ? 'blue' : 'white',
                    },
                  ]}
                  onPress={() => handleChange('sexo')('Masculino')}
                >
                  <Text style={styles.radioButtonText}>Masculino</Text>
                </TouchableOpacity>
              </View>
                <Text style={styles.formLabel}>Edad</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Edad"
                  onChangeText={handleChange('edad')}
                  onBlur={handleBlur('edad')}
                  value={values.edad}
                  keyboardType="numeric"
                  
                />

                <Text style={styles.formLabel}>Fecha de Nacimiento</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Fecha de Nacimiento"
                  onChangeText={handleChange('fechaNacimiento')}
                  onBlur={handleBlur('fechaNacimiento')}
                  value={values.fechaNacimiento}
                  keyboardType="default"
                />

                <Text style={styles.formLabel}>Origen</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Origen"
                  onChangeText={handleChange('origen')}
                  onBlur={handleBlur('origen')}
                  value={values.origen}
                  keyboardType="default"
                />

                <Text style={styles.formLabel}>Raza</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Raza"
                  onChangeText={handleChange('raza')}
                  onBlur={handleBlur('raza')}
                  value={values.raza}
                  keyboardType="default"
                />
                
                <TouchableOpacity
                  style={styles.colorBtn}
                  onPress={handleSubmit}
                >
                  <Text style={styles.colorTxtBtn}>Aceptar</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      );
    }
    return personForms;
  };

  return (
    <ScrollView>
      <View style={styles.containerStyle}>
        <Text style={styles.formulario}>Formulario</Text>
        {renderPersonForms()}
      </View>
    </ScrollView>
    );
};

// Mensajes de Validación del Formulario
const loginValidationSchema = yup.object().shape({
  nombresyapellidos: yup
    .string("Ingresa el nombre de la persona")
    .required("*Campo requerido"),
  sexo: yup
    .string("Ingresa el sexo")
    .required("*Campo requerido"),
  edad: yup
    .number("Ingresa la edad")
    .required("*Campo requerido"),
  fechaNacimiento: yup
    .string("Ingresa la fecha de nacimiento")
    .required("*Campo requerido"),
  origen: yup
    .string("Ingresa el origen")
    .required("*Campo requerido"),
  raza: yup
    .string("Ingresa la raza")
    .required("*Campo requerido"),
});

export default CensoForm;