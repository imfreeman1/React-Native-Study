import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import {authNavigationList} from '../constants';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '../navigation/AuthStackNavigator';

type AuthHomeScreenProps = StackScreenProps<AuthStackParamList>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인"
          onPress={() => navigation.navigate(authNavigationList.LOGIN)}
        />
        <Button
          title="회원가입"
          onPress={() => navigation.navigate(authNavigationList.SIGN_UP)}
        />
        <Button title="지도" onPress={() => navigation.navigate('Map')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default AuthHomeScreen;
