// app/index.js
import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    Modal,
    TextInput,
    FlatList,
    Alert,
    StyleSheet,
} from "react-native";

export default function HomeScreen() {
    const [tasks, setTasks] = useState([]); // Lista de contatos
    const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
    const [newTask, setNewTask] = useState(""); // Texto do novo contato
    const [editIndex, setEditIndex] = useState(null); // Índice de contato em edição

    // Função para adicionar ou editar contatos
    function addOrEditTask() {
        if (!newTask) return; // Se o campo estiver vazio (sem espaços ou texto), não faz nada

        if (editIndex === null) {
            // Adiciona um novo contato diretamente ao estado
            tasks.push(newTask); // Modifica o array diretamente
        } else {
            // Edita uma tarefa existente
            tasks[editIndex] = newTask; // Atualiza o contato no índice de edição
            setEditIndex(null); // Limpa o índice de edição
        }

        setTasks(tasks); // Atualiza o estado com a lista do contato modificada
        setNewTask(""); // Limpa o campo de contatos
        setModalVisible(false); // Fecha o modal
    }

    // Função para confirmar exclusão do contato
    function confirmDelete(index) {
        Alert.alert("Excluir contato?", `Remover "${tasks[index]}"?`, [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: () => {
                    tasks.splice(index, 1); // Remove o contato diretamente do array
                    setTasks(tasks); // Atualiza o estado com a lista modificada
                },
            },
        ]);
    }

    // Função para abrir o modal em modo de edição
    function openEditModal(index) {
        setNewTask(tasks[index]); // Carrega o contato no campo de edição
        setEditIndex(index); // Define o índice do contato a ser editada
        setModalVisible(true); // Abre o modal
    }

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal */}
            <Pressable
                onPress={() => {
                    setNewTask("");
                    setEditIndex(null);
                    setModalVisible(true);
                }}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>＋ Novo Contato</Text>
            </Pressable>

            {/* Lista de contatos */}
            <FlatList
                data={tasks}
                keyExtractor={(_, i) => String(i)} // Identificador único para cada item
                renderItem={({ item, index }) => (
                    <View style={styles.taskItemContainer}>
                        <Text style={styles.taskItem}>{item}</Text>
                        <View style={styles.taskButtons}>
                            {/* Botões para editar e excluir */}
                            <Pressable
                                onPress={() => openEditModal(index)} // Abre o modal para editar
                                style={[styles.taskButton, styles.editButton]}
                            >
                                <Text style={styles.buttonText}>✏️</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => confirmDelete(index)} // Exclui o contato
                                style={[styles.taskButton, styles.deleteButton]}
                            >
                                <Text style={styles.buttonText}>🗑️</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhuma contato ainda!</Text>
                }
            />

            {/* Modal para adicionar ou editar o contato */}
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackdrop}>
                    <View style={styles.modalContent}>
                        <Text style={{ marginBottom: 8}}>
                            {editIndex === null
                                ? "Digite seu novo contato:"
                                : "Edite o contato:"}
                        </Text>
                        <TextInput
                            value={newTask} // O valor do campo de texto é controlado pelo estado `newTask`
                            onChangeText={setNewTask} // Atualiza o estado com o novo texto
                            placeholder="Ex: 55+ (00) 00000-0000"
                            style={styles.input}
                        />
                        <Pressable onPress={addOrEditTask} style={{ marginBottom: 8 }}>
                            <Text style={{ color: "#000", textAlign: "center" }}>
                                {editIndex === null ? "Adicionar" : "Salvar alterações"}
                            </Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={{ color: "#000", textAlign: "center" }}>
                                Cancelar
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    addButton: {
        marginBottom: 16,
        alignSelf: "center",
        backgroundColor: "#e8107c", // Rosa (#e8107c)
        padding: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: "#fff", // Cor do texto (branco)
        fontSize: 16,
    },
    taskItemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        padding: 12,
        backgroundColor: "#f1f1f1",// cor q não aparece q é transparente
        borderRadius: 6,
    },
    taskItem: {
        flex: 1,
        fontSize: 16,
    },
    taskButtons: {
        flexDirection: "row",
    },
    taskButton: {
        marginLeft: 8,
        padding: 6,
        borderRadius: 4,
    },
    editButton: {
        backgroundColor: "#e8107c", // Cor (#e8107c)
    },
    deleteButton: {
        backgroundColor: "#e8107c", // Cor  (#e8107c)
    },
    buttonText: {
        color: "#e8107c",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 32,
        color: "#e8107c",
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)", // Fundo escuro com transparência
    },
    modalContent: {
        width: "80%",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 22,
        marginBottom: 10,
        color: "#e8107c",
        backgroundColor: "#f1f1f1", // cor q não aparece q é transparente
    },
});