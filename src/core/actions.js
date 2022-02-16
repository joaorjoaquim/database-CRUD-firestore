import React, {} from 'react';
import { View } from 'react-native';

// import { Container } from './styles';

export default actions = () => {
  const getFirebaseData = async (taskContext) => {
    database.db.collection("Tasks").get()
      .then((querySnapshot) => {
          let list = []
          querySnapshot.forEach(onSnapshot => {
              let data = onSnapshot.data();
              list.push({...data, id: onSnapshot.id}) //dados + document id
          })
          taskContext.list = list
      })
  }
}