import { saveAccount } from "@/services/account/account";
import { useAuthStore } from "@/store/authStore";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const jwt = useAuthStore((state) => state.jwt);

  const [form, setForm] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    address: "",
    phone: "",
    meterNumber: "",
    meterMark: "",
    role: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    console.log("Formulario enviado:", form);
    const response = await saveAccount(form, jwt || "");
    if (response.id === 0 || response.id === null) alert("Error");
    alert("¡Formulario enviado con éxito!");
  };

  const tiposClientes = [{ key: "CLIENT", value: "CLIENT", disabled: true }];

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          <Text className="text-2xl font-bold text-black mb-4">
            Registrar {currentStep === 0 ? "Cliente" : "Medidor"} (Paso{" "}
            {currentStep + 1} de 2)
          </Text>

          {/* ----- Paso 1 ----- */}
          {currentStep === 0 && (
            <View>
              <Text className="text-black mb-1">Nombres</Text>
              <TextInput
                placeholder="Ingresa tus nombres"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                value={form.name}
                onChangeText={(name) => handleChange("name", name)}
              />
              <Text className="text-black mb-1">Apellidos</Text>
              <TextInput
                placeholder="Ingresa tus apellidos"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                value={form.lastname}
                onChangeText={(lastname) => handleChange("lastname", lastname)}
              />
              <Text className="text-black mb-1">Correo</Text>
              <TextInput
                placeholder="Ingresa tu correo"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(email) => handleChange("email", email)}
              />
              <Text className="text-black mb-1">Cédula</Text>
              <TextInput
                placeholder="Ingresa tu número de cédula"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                keyboardType="numeric"
                value={form.dni}
                onChangeText={(dni) => handleChange("dni", dni)}
              />
              <Text className="text-black mb-1">Dirección</Text>
              <TextInput
                placeholder="Ingresa tu dirección"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                value={form.address}
                onChangeText={(address) => handleChange("address", address)}
              />
              <Text className="text-black mb-1">Teléfono</Text>
              <TextInput
                placeholder="Ingresa tu teléfono"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                keyboardType="phone-pad"
                value={form.phone}
                onChangeText={(numberPhone) =>
                  handleChange("phone", numberPhone)
                }
              />
              <Text className="text-black mb-1">Tipo de Cliente</Text>
              <SelectList
                setSelected={(val: string) => handleChange("role", val)}
                data={tiposClientes}
                save="key"
                boxStyles={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 12,
                  marginBottom: 12,
                }}
                dropdownStyles={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 12,
                }}
                defaultOption={tiposClientes.find((t) => t.key === "CLIENT")}
                placeholder="Selecciona un tipo de usuario"
              />
            </View>
          )}

          {/* ----- Paso 2 ----- */}
          {currentStep === 1 && (
            <View>
              <Text className="text-black mb-1">Número de medidor</Text>
              <TextInput
                placeholder="Número que aparece en el medidor"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                value={form.meterNumber}
                onChangeText={(meterNumber) =>
                  handleChange("meterNumber", meterNumber)
                }
              />

              <Text className="text-black mb-1">Marca de medidor</Text>
              <TextInput
                placeholder="Marca que aparece en el medidor"
                className="bg-gray-100 p-3 rounded-xl mb-3"
                value={form.meterMark}
                onChangeText={(meterMark) =>
                  handleChange("meterMark", meterMark)
                }
              />
            </View>
          )}

          {/* Botones de navegación */}
          <View className="flex-row justify-between mt-6">
            {currentStep > 0 && (
              <TouchableOpacity
                className="bg-gray-500 rounded-xl p-3 flex-1 mr-2"
                onPress={handleBack}
              >
                <Text className="text-white text-center font-semibold">
                  ANTERIOR
                </Text>
              </TouchableOpacity>
            )}

            {currentStep < 1 ? ( // Cambia este número si añades más pasos
              <TouchableOpacity
                className="bg-[#1C1C1E] rounded-xl p-3 flex-1 ml-2"
                onPress={handleNext}
              >
                <Text className="text-white text-center font-semibold">
                  SIGUIENTE
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-green-600 rounded-xl p-3 flex-1 ml-2"
                onPress={handleSubmit}
              >
                <Text className="text-white text-center font-semibold">
                  ENVIAR
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
