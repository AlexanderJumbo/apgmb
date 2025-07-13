// components/AccountModal.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { saveAccount, updateAccount } from "@/services/account/account";
import { useAuthStore } from "@/store/authStore";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "@/config";

export interface AccountForm {
  accountId: number;
  userId: 0;
  meterId: 0;
  name: string;
  lastname: string;
  dni: string;
  email: string;
  address: string;
  phone: string;
  meterNumber: string;
  meterMark: string;
  predialCode: string;
  nameSector: string;
  role: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onRefresh?: () => void;
  editId?: number;
  defaultValues?: Partial<AccountForm>;
}

const AccountModal = ({
  visible,
  onClose,
  onRefresh,
  editId = 0,
  defaultValues = {},
}: Props) => {
  console.log("🚀 ~ defaultValueaaaaas:", defaultValues);
  const jwt = useAuthStore((state) => state.jwt);
  const [currentStep, setCurrentStep] = useState(0);
  const [sectorsList, setSectorsList] = useState([]);

  const [form, setForm] = useState<AccountForm>({
    accountId: 0,
    userId: 0,
    meterId: 0,
    name: "",
    lastname: "",
    dni: "",
    email: "",
    address: "",
    phone: "",
    meterNumber: "",
    meterMark: "",
    predialCode: "",
    nameSector: "",
    role: "CLIENT",
  });
  console.log("🚀 ~ form:", form);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleNext = () => setCurrentStep((s) => s + 1);
  const handleBack = () => setCurrentStep((s) => s - 1);

  const handleSubmit = async () => {
    console.log("form enviar " + form);
    const response =
      editId === 0
        ? await saveAccount(form, jwt || "")
        : await updateAccount(form, jwt ?? "");
    if (response?.id === 0 || response?.id === null) {
      alert("Error al guardar");
    } else {
      alert("¡Formulario enviado con éxito!");
      onClose();
      onRefresh?.();
    }
  };

  const tiposClientes = [{ key: "CLIENT", value: "CLIENTE", disabled: true }];

  const getAllSectors = async (jwt: string) => {
    const res = await fetch(`${BASE_URL}sector/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) throw new Error("Ocurrió un error");
    const data = await res.json();
    console.log("getAllSectors", data);

    const dataMapped = data
      .filter(
        (item: any) =>
          item.nameSector !== null &&
          item.nameSector !== undefined &&
          item.nameSector !== ""
      )
      .map((item: any) => ({
        key: item.nameSector, //item.sectorId.toString(),
        value: item.nameSector,
      }));

    setSectorsList(dataMapped);
  };

  useFocusEffect(
    useCallback(() => {
      getAllSectors(jwt ?? "");
      return () => {};
    }, [jwt])
  );

  useEffect(() => {
    if (visible) {
      if (editId === 0) {
        // NUEVA CUENTA — limpiar
        setForm({
          accountId: 0,
          userId: 0,
          meterId: 0,
          name: "",
          lastname: "",
          dni: "",
          email: "",
          address: "",
          phone: "",
          meterNumber: "",
          meterMark: "",
          predialCode: "",
          nameSector: "",
          role: "",
        });
      } else if (defaultValues) {
        // EDICIÓN — cargar valores existentes
        setForm({
          accountId: defaultValues.accountId || 0,
          userId: defaultValues.userId || 0,
          meterId: defaultValues.meterId || 0,
          name: defaultValues.name || "",
          lastname: defaultValues.lastname || "",
          dni: defaultValues.dni || "",
          email: defaultValues.email || "",
          address: defaultValues.address || "",
          phone: defaultValues.phone || "",
          meterNumber: defaultValues.meterNumber || "",
          meterMark: defaultValues.meterMark || "",
          predialCode: defaultValues.predialCode || "",
          nameSector: defaultValues.nameSector || "",
          role: defaultValues.role || "",
        });
      }
      setCurrentStep(0);
    }
  }, [visible, editId]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <SafeAreaView className="flex-1 bg-[#F7F8FA]">
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <View className="bg-white rounded-3xl p-6 shadow-xl">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-black">
                {editId === 0 ? "Registrar Cliente" : "Editar Cliente"}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Text className="text-red-500 text-xl">✕</Text>
              </TouchableOpacity>
            </View>

            <Text className="text-base text-gray-500 mb-4">
              Paso {currentStep + 1} de 2
            </Text>

            {currentStep === 0 && (
              <View>
                <Text className="text-black mb-1">Nombres</Text>
                <TextInput
                  placeholder="Ingresa tus nombres"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.name}
                  onChangeText={(val) => handleChange("name", val)}
                />
                <Text className="text-black mb-1">Apellidos</Text>
                <TextInput
                  placeholder="Ingresa tus apellidos"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.lastname}
                  onChangeText={(val) => handleChange("lastname", val)}
                />
                <Text className="text-black mb-1">Correo</Text>
                <TextInput
                  placeholder="Correo electrónico"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(val) => handleChange("email", val)}
                />
                <Text className="text-black mb-1">Cédula</Text>
                <TextInput
                  placeholder="Número de cédula"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  keyboardType="numeric"
                  value={form.dni}
                  onChangeText={(val) => handleChange("dni", val)}
                />
                <Text className="text-black mb-1">Dirección</Text>
                <TextInput
                  placeholder="Dirección"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.address}
                  onChangeText={(val) => handleChange("address", val)}
                />
                <Text className="text-black mb-1">Teléfono</Text>
                <TextInput
                  placeholder="Teléfono"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  keyboardType="phone-pad"
                  value={form.phone}
                  onChangeText={(val) => handleChange("phone", val)}
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

            {currentStep === 1 && (
              <View>
                <Text className="text-black mb-1">Número de medidor</Text>
                <TextInput
                  placeholder="Número que aparece en el medidor"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.meterNumber}
                  onChangeText={(val) => handleChange("meterNumber", val)}
                />
                <Text className="text-black mb-1">Marca del medidor</Text>
                <TextInput
                  placeholder="Marca que aparece en el medidor"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.meterMark}
                  onChangeText={(val) => handleChange("meterMark", val)}
                />
                <Text className="text-black mb-1">Código predial</Text>
                <TextInput
                  placeholder="Ingrese código predial"
                  className="bg-gray-100 p-3 rounded-xl mb-3"
                  value={form.predialCode}
                  onChangeText={(val) => handleChange("predialCode", val)}
                />
                <Text className="text-black mb-1">Sector</Text>
                <SelectList
                  setSelected={(val: string) => handleChange("nameSector", val)}
                  data={sectorsList}
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
                  defaultOption={sectorsList.find(
                    (s) => s.key === form.nameSector
                  )}
                  placeholder="Selecciona el sector"
                />
              </View>
            )}

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
              {currentStep < 1 ? (
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
    </Modal>
  );
};

export default AccountModal;
