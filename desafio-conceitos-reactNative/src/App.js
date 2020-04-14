import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  ScrollView,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';

export default function App() {
	const [ repositories, setRepositories ] = useState([]); 

	useEffect(() => {
		api.get('/repositories').then(response => {
			setRepositories(response.data);
		}).catch(err => {
			console.log('erro:' + err);
		})
	}, [])

	async function handleLikeRepository(id) {
		await api.post(`repositories/${id}/like`).then(resp => {
			console.log(resp.data);
			setRepositories(resp.data);
		})
	}

	return (
		<>
		<StatusBar barStyle="light-content" backgroundColor="#7159c1" />
			<ScrollView style={styles.container}>
				{repositories.map(resp => (
					<View style={styles.repositoryContainer} key={resp.id}>
						<Text style={styles.repository}>{resp.title}</Text>

						<View style={styles.likesContainer}>
							<Text
								style={styles.likeText}
								testID={`repository-likes-1`}
							>
							{resp.likes} curtidas
							</Text>
						</View>

						<TouchableOpacity
							style={styles.button}
							onPress={() => handleLikeRepository(resp.id)}
							testID={`like-button-1`}
						>
							<Text style={styles.buttonText}>Curtir</Text>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
