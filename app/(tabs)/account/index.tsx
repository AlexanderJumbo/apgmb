// AppointmentsScreen.tsx
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "@/config";
import { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { AccountList } from "@/models/account/aacountList";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountModal, { AccountForm } from "@/components/shared/Modal";

export default function AppointmentsScreen() {
  const router = useRouter();
  const jwt = useAuthStore((state) => state.jwt);
  const [accountsList, setAccountsList] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState(0);
  const [defaultValues, setDefaultValues] = useState<Partial<AccountList>>({});

  const openModal = (id: number, account?: Partial<AccountList>) => {
    console.log("🚀 ~ openModal ~ account:", account);

    setEditId(id);
    setDefaultValues(account || {});
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      const getAllAccounts = async (jwt: string) => {
        const res = await fetch(`${BASE_URL}account/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (!res.ok) throw new Error("Ocurrió un error");
        const data = await res.json();
        console.log("getAllAccounts", data);
        setAccountsList(data);
      };
      getAllAccounts(jwt ?? "");

      return () => {};
    }, [jwt])
  );

  // const openModal = (id: number, account: AccountList) => {
  //   console.log(id === 0 ? "Guardar" : "Editar");
  // };
  const formatDate = (dateString: string) => {
    if (dateString === "") return "S/F";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // enero = 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const renderItem = ({ item }: { item: AccountList }) => (
    <View className="bg-gray-50 rounded-xl p-4 mb-3 shadow-sm">
      <Text className="text-lg font-semibold text-gray-800">
        {item.name + " " + item.lastname}
      </Text>
      <Text className="text-sm text-gray-600">
        Fecha: {formatDate(item.dateRegister ?? "")}
      </Text>
      <Text className="text-sm text-gray-600">N° Cuenta: {item.accountId}</Text>
      <Text className="text-sm text-gray-600">Medidor: {item.meterNumber}</Text>
      <Text className="text-sm text-gray-600">Teléfono: {item.phone}</Text>

      <View className="flex-row justify-between items-center mt-3">
        <View className="flex-row space-x-3">
          <TouchableOpacity onPress={() => openModal(item.accountId, item)}>
            <Ionicons name="create-outline" size={20} color="#6B46C1" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="eye-outline" size={20} color="#6B46C1" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>

        <Text
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.active ? "Activa" : "Cancelada"}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F7F8FA]">
      <View className="flex-1 bg-white p-4">
        {/* Header buttons */}
        <View className="flex-row justify-between items-center mb-4">
          <View className="flex-row space-x-2">
            <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-gray-700">Todas activas</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-100 px-3 py-1 rounded-full">
              <Text className="text-sm text-gray-700">All</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className="bg-purple-600 px-4 py-2 rounded-xl"
            onPress={() => openModal(0)}
          >
            <Text className="text-white text-sm font-semibold">
              Nueva cuenta
            </Text>
          </TouchableOpacity>
        </View>

        {/* FlatList */}
        <FlatList
          data={accountsList}
          keyExtractor={(account) => account.accountId.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <AccountModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          editId={editId}
          defaultValues={defaultValues}
        />
      </View>
    </SafeAreaView>
  );
}
