import React, {useEffect} from "react";
import {Button, SafeAreaView, ScrollView, StatusBar, Text, useColorScheme, View} from "react-native";

import {connect} from "react-redux";

import SubScreenNav from "../../navigation/ScreenNav";
import {NavigationProp} from "@react-navigation/native";

import Table from "../../components/Table";

import styles from "./BalancesStyles";
import {BalanceState, fetchBalances} from "./BalancesSlice";
import {bindActionCreators} from "redux";
import {AppDispatch, RootState} from "../../app/store";
import {TradeState} from "../trade/TradeSlice";


export type BalanceType = {
    asset: string
    amount: number
}

const Balances: React.FC<BalanceProps> = (props: BalanceProps): JSX.Element => {
    const isDarkMode = useColorScheme() === 'dark';

    const errorText: JSX.Element = <Text style={styles.error}>Unable to retrieve balances</Text>;
    const balances: JSX.Element = (props.balances ?
            <Table data={props.balances} cols={["asset", "amount"]}/>
            : errorText);

    return (
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'}/>
                <ScrollView contentInsetAdjustmentBehavior="automatic"
                            style={styles.results}>
                    {balances}
                </ScrollView>
                <View style={styles.queryButton}>
                    <Button title="Update balances" onPress={props.fetchBalances}/>
                </View>
                <SubScreenNav navigation={props.navigation}/>
            </SafeAreaView>
    );
}

interface BalanceProps {
    balances: Array<BalanceType>,
    navigation: NavigationProp<any>,
    fetchBalances: typeof fetchBalances
}

const mapStateToProps = (state: RootState) => {
    return {
        balances: state.balances.balances
    };
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return bindActionCreators({
        fetchBalances
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Balances);