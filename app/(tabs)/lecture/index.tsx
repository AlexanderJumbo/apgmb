import { useCallback, useEffect, useState } from "react";
import {
  Platform,
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
import Toast from "react-native-toast-message";

import { StatusBar } from "expo-status-bar";
import { saveLecture } from "@/services/lecture/lecture";

const Index = () => {
  const jwt = useAuthStore((state) => state.jwt);
  const userId = useAuthStore((state) => state.userId);
  console.log("🚀 ~ Index ~ jwt:", jwt);

  //const [metersList, setMetersList] = useState([]);
  const [metersList, setMetersList] = useState<
    { key: string; value: string }[]
  >([]);
  console.log("🚀 ~ Index ~ metersList:", metersList);
  const [hasCurrentLecture, setHasCurrentLecture] = useState(false);

  const [selectedMeter, setSelectedMeter] = useState("");

  const [form, setForm] = useState({
    meter: "",
    name: "",
    prevLecture: 0,
    currentLecture: 0,
    observation: "",
    accountLecture: 0,
    operator: Number(userId),
  });

  console.log("form.currentLecture", form.currentLecture);

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

          const dataMapped = [
            { key: "", value: "Seleccione un medidor" },
            ...data
              .filter(
                (item: any) =>
                  item.serial !== null &&
                  item.serial !== undefined &&
                  item.serial !== ""
              )
              .map((item: any) => ({
                key: item.meterId.toString(),
                value: item.serial,
              })),
          ];

          setMetersList(dataMapped);
        } catch (error) {
          console.error("Error al obtener medidores:", error);
        }
      };

      meters();

      // Cleanup
      return () => {
        // AQUÍ limpiar estados, cancelar requests, etc.
      };
    }, [jwt])
  );

  const clearFields = () => {
    setForm({
      meter: "",
      name: "",
      prevLecture: 0,
      currentLecture: 0,
      observation: "",
      accountLecture: 0,
      operator: Number(userId),
    });
    setSelectedMeter("");
    setHasCurrentLecture(false);
  };

  const areCompleteFields =
    form.meter !== "" &&
    form.name !== "" &&
    //form.prevLecture !== 0 &&
    form.currentLecture !== 0 &&
    form.observation !== "" &&
    form.accountLecture !== 0 &&
    selectedMeter !== "";

  useEffect(() => {
    if (form.meter === "") {
      setSelectedMeter("");
    }
  }, [form.meter]);

  useEffect(() => {
    if (!form.meter) return;
    const user = async () => {
      try {
        const res = await fetch(`${BASE_URL}account/by-meter/${form.meter}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        if (!res.ok) {
          setForm((prevForm) => ({
            ...prevForm,
            name: "",
            accountLecture: 0,
            prevLecture: 0,
            currentLecture: 0,
          }));
          throw new Error("Credenciales inválidas");
        }

        const data = await res.json();
        setForm((prevForm) => ({
          ...prevForm,
          name: data.name + " " + data.lastName,
          accountLecture: data.accountId,
          prevLecture: data.previousLecture ?? 0,
          currentLecture: 0,
        }));
        console.log("🚀 ~ userrrrr ~ data:", data);

        const hasLectureRequest = await fetch(
          `${BASE_URL}lecture/lastByAccount/${data.accountId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        );

        const hasLecture = await hasLectureRequest.json();
        console.log("🚀 ~ user ~ hasLecture:", hasLecture);
        setHasCurrentLecture(hasLecture);
      } catch (error) {
        console.error("Error al obtener medidores:", error);
      }
    };

    user();
  }, [form.meter, jwt]);

  const handleChange = (field: string, value: string | number) => {
    console.log("🚀 ~ handleChange ~ value:", value);
    console.log("🚀 ~ handleChange ~ field:", field);
    if (value === "") clearFields();
    //setForm({ ...form, [field]: value });
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const registerLecture = async () => {
    if (form.currentLecture <= form.prevLecture) {
      Toast.show({
        type: "error",
        text1: "Posible lectura ERRÓNEA",
        text2: "Verifique los datos antes de guardar",
      });
    }
    const newForm = {
      prevLecture: form.prevLecture,
      currentLecture: form.currentLecture,
      observation: form.observation,
      accountLecture: form.accountLecture,
      operator: form.operator,
    };
    const response = await saveLecture(newForm, jwt || "");
    if (response.idLecture === 0 || response.idLecture === null) {
      Toast.show({
        type: "error",
        text1: "La lectura no pudo ser registrada con éxito",
        text2: "Verifique los datos antes de guardar",
      });
    } else {
      Toast.show({
        type: "success",
        text1: "Lectura registrada",
        text2: "Tu lectura fue enviada correctamente 👌",
      });
      clearFields();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]">
      <StatusBar style={Platform.OS === "ios" ? "dark" : "auto"} translucent />
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <View className="bg-white rounded-3xl p-6 shadow-xl">
          <Text className="text-2xl font-bold text-black mb-4">
            Registrar lectura
          </Text>

          <SelectList
            //key={form.meter}
            //setSelected={(val: string) => handleChange("meter", val)}
            setSelected={(val: string) => {
              setSelectedMeter(val);
              handleChange("meter", val);
            }}
            data={metersList}
            save="key"
            boxStyles={{ backgroundColor: "#f3f4f6", borderRadius: 12 }}
            dropdownStyles={{ backgroundColor: "#f3f4f6", borderRadius: 12 }}
            defaultOption={metersList.find(
              (item) => item.key === selectedMeter
            )}
            placeholder="Seleccione un medidor"
          />

          <Text className="text-black mb-1">Cliente</Text>
          <TextInput
            placeholder="Nombre del dueño del medidor"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            value={form.name ?? ""}
            onChangeText={(text) => handleChange("name", text)}
            editable={false}
          />

          <Text className="text-black mb-1">Lectura anterior</Text>
          <TextInput
            placeholder="Valor de lectura del mes anterior"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            keyboardType="numeric"
            value={form.prevLecture?.toString() ?? 0}
            onChangeText={(prevLecture) =>
              handleChange("prevLecture", Number(prevLecture))
            }
            editable={false}
          />

          <Text className="text-black mb-1">Lectura actual</Text>
          <TextInput
            placeholder="Valor de lectura del mes actual"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            keyboardType="numeric"
            value={form.currentLecture.toString() ?? 0}
            onChangeText={(currentLecture) =>
              handleChange("currentLecture", Number(currentLecture))
            }
          />

          <Text className="text-black mb-1">Observación</Text>
          <TextInput
            placeholder="Ingrese una observación en caso de anomalías"
            className="bg-gray-100 p-3 rounded-xl mb-3"
            value={form.observation}
            onChangeText={(observation) =>
              handleChange("observation", observation)
            }
            multiline
            numberOfLines={6}
          />

          <View className="mt-2 p-3 bg-gray-100 rounded-xl">
            <Text className="text-black mb-1">Resumen</Text>
            {form.currentLecture === 0 ? (
              <Text
                className={`text-base ${hasCurrentLecture ? "text-red-600 mt-1" : "text-gray-500"} italic`}
              >
                {hasCurrentLecture
                  ? "Este medidor ya posee una lectura para el mes actual, por lo que ya no podrá registrar una nueva"
                  : "Sin lectura ingresada aún"}
              </Text>
            ) : (
              <>
                <Text className="text-base font-bold text-black">
                  Consumo actual:{" "}
                  {/* {Math.max(0, form.currentLecture - form.prevLecture)} m³ */}
                  {form.currentLecture - form.prevLecture} m³
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  Fecha: {new Date().toLocaleDateString()}
                </Text>
                {form.currentLecture < form.prevLecture && (
                  <Text className="text-sm text-red-600 mt-1">
                    Lectura actual puede presentar un error de digitación, antes
                    de guardar por favor asegúrese de haber ingresado los
                    valores correctos
                  </Text>
                )}
              </>
            )}
          </View>

          {/* bg-red-500 */}
          <TouchableOpacity
            className={`mt-6 ${hasCurrentLecture || !areCompleteFields ? "bg-[#454547]" : "bg-[#22c194]"} rounded-xl p-3`}
            onPress={registerLecture}
            disabled={hasCurrentLecture || !areCompleteFields}
          >
            <Text className="text-white text-center font-semibold">SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
