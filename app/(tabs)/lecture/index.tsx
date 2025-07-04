import { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SelectList } from "react-native-dropdown-select-list";
import { BASE_URL } from "@/config";
import { useAuthStore } from "@/store/authStore";
import { useFocusEffect } from "@react-navigation/native";

const Index = () => {
  const jwt = useAuthStore((state) => state.jwt);
  console.log("🚀 ~ Index ~ jwt:", jwt);

  const [metersList, setMetersList] = useState([]);
  console.log("🚀 ~ Index ~ metersList:", metersList);

  const [form, setForm] = useState({
    meter: "",
    name: "",
    email: "",
    phone: "",
    institute: "",
    education: "",
    job: "",
    organization: "",
    experience: "",
  });

  useFocusEffect(
    useCallback(() => {
      const meters = async () => {
        try {
          const res = await fetch(`${BASE_URL}meter`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (!res.ok) throw new Error("Credenciales inválidas");

          const data = await res.json();
          console.log("🚀 ~ meters ~ data:", data);

          const dataMapped = data
            .filter(
              (item: any) =>
                item.serial !== null &&
                item.serial !== undefined &&
                item.serial !== ""
            )
            .map((item: any) => ({
              key: item.meterId.toString(),
              value: item.serial,
            }));

          setMetersList(dataMapped);
        } catch (error) {
          console.error("Error al obtener medidores:", error);
        }
      };

      meters();

      // Cleanup opcional si se necesita
      return () => {
        // por ejemplo: limpiar estados, cancelar requests, etc.
      };
    }, [jwt]) // se vuelve a ejecutar si cambia el token
  );

  useEffect(() => {
    if (!form.meter) return;
    const user = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}account/userbymeter/${form.meter}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        if (!res.ok) {
          setForm((prevForm) => ({
            ...prevForm,
            name: "",
          }));
          throw new Error("Credenciales inválidas");
        }

        const data = await res.json();
        setForm((prevForm) => ({
          ...prevForm,
          name: data.fullname,
        }));
        console.log("🚀 ~ userrrrr ~ data:", data);
      } catch (error) {
        console.error("Error al obtener medidores:", error);
      }
    };

    user();
  }, [form.meter, jwt]);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          <Text className="text-2xl font-bold text-black mb-4">
            Registrar lectura
          </Text>

          <SelectList
            setSelected={(val: string) => handleChange("meter", val)}
            data={metersList}
            save="key"
            boxStyles={{ backgroundColor: "#f3f4f6", borderRadius: 12 }}
            dropdownStyles={{ backgroundColor: "#f3f4f6", borderRadius: 12 }}
            placeholder="Seleccione un medidor"
          />

          <Text className="text-black mb-1">Name</Text>
          <TextInput
            placeholder="Enter your name"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
          />

          <Text className="text-black mb-1">Email</Text>
          <TextInput
            placeholder="Enter your email"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
          />

          <Text className="text-black mb-1">Phone number</Text>
          <TextInput
            placeholder="Enter your phone"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
          />
          {/* bg-red-500 */}
          <TouchableOpacity className="mt-6 bg-[#1C1C1E] rounded-xl p-3">
            <Text className="text-white text-center font-semibold">SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
