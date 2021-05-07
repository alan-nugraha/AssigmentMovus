import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {Loading} from '../../components';

function Home() {
  const [dataCurrency, setDataCurrency] = useState([]);
  const [currencies, setCurriencies] = useState(['USD', 'CAD']);
  const [inputCurrency, setInputCurrency] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [condition, setCondition] = useState(false);

  const getDataCurrency = () => {
    setIsLoading(true);
    axios
      .get(
        `http://api.exchangeratesapi.io/v1/latest?access_key=76d6acb0420f7522a14a1700bb00123b&symbols=${currencies.join(
          ',',
        )}&format=1`,
      )
      .then(result => {
        setDataCurrency(result.data.rates);
        setIsLoading(false);
      });
  };

  const key = Object.keys(dataCurrency);

  const newDataCurrency = key.map(item => {
    return {nameCurrency: item, amountCurrency: dataCurrency[item]};
  });

  const deleteCurrency = index => {
    let deleteDataCurrency = currencies;
    deleteDataCurrency.splice(index, 1);
    setCurriencies(deleteDataCurrency);
    getDataCurrency();
  };

  const addCurrency = () => {
    let addDataCurrency = currencies;
    addDataCurrency.push(inputCurrency);
    setCurriencies(addDataCurrency);
    getDataCurrency();
    setInputCurrency('');
    setCondition(false);
  };

  const parseCurrencies = nameCurrency => {
    switch (nameCurrency) {
      case 'USD':
        return 'USD - United States Dollar';
      case 'CAD':
        return 'CAD - Dollar Canada';
      case 'IDR':
        return 'IDR - Indonesia Rupiah';
      case 'GBP':
        return 'GBP - British Pound';
      case 'CHF':
        return 'CHF - Franc Swiss';
      case 'SGD':
        return 'SGD - Singapore Dollar';
      case 'INR':
        return 'INR - Rupee India';
      case 'MYR':
        return 'MYR - Ringgit Malaysia';
      case 'JPY':
        return 'JPY - Japanese Yen';
      case 'KRW':
        return 'KRW - Won Korea';
      default:
        break;
    }
  };

  useEffect(() => {
    getDataCurrency();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <ScrollView style={styles.containerContent}>
        <Text>USD - United States Dollars</Text>
        <View style={styles.containerAmount}>
          <Text style={styles.balanceCurrency}>USD</Text>
          <Text style={styles.balanceCurrency}>10.0000</Text>
        </View>
        {newDataCurrency.map((item, index) => (
          <View key={index} style={styles.containerCurrencies}>
            <View style={styles.infoCurrencies}>
              <View style={styles.topInfoCurrencies}>
                <Text>{item.nameCurrency}</Text>
                <Text>{parseFloat(item.amountCurrency * 10)}</Text>
              </View>
              <Text style={styles.nameCurrency}>
                {parseCurrencies(item.nameCurrency)}
              </Text>
              <Text style={styles.balanceCurrency}>
                1 USD = {item.nameCurrency} {item.amountCurrency}
              </Text>
            </View>
            <View style={styles.positionButton}>
              <TouchableOpacity onPress={() => deleteCurrency(index)}>
                <Image
                  style={styles.iconDeleteCurrency}
                  source={require('../../assets/icons/ic_trash.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {condition ? (
          <View>
            <TextInput
              style={styles.inputCurrency}
              value={inputCurrency}
              onChangeText={val => setInputCurrency(val)}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => addCurrency()}>
              <Text style={styles.textButton}>Submit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCondition(true)}>
            <Text style={styles.textButton}>Add More Currencies</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerContent: {
    padding: '5%',
  },
  containerAmount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerCurrencies: {
    marginTop: '5%',
    padding: '3%',
    backgroundColor: '#FDFEFE',
    shadowColor: '#EEF1F4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoCurrencies: {
    flex: 1,
  },
  topInfoCurrencies: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionButton: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#EFF2F5',
    padding: 15,
    marginTop: 20,
    justifyContent: 'center',
    borderRadius: 15,
    marginBottom: 60,
  },
  textButton: {
    textAlign: 'center',
    color: '#484A58',
  },
  inputCurrency: {
    borderWidth: 1,
    borderColor: '#EFF2F5',
    marginTop: 15,
  },
  iconDeleteCurrency: {
    width: 20,
    height: 20,
  },
  balanceCurrency: {
    fontWeight: 'bold',
  },
  nameCurrency: {
    fontStyle: 'italic',
  },
});
