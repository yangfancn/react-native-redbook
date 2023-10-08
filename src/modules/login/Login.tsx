import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, Linking, TextInput, LayoutAnimation } from "react-native";
import Toast from 'react-native-root-toast';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { fromatPhone, replaceBlank } from "../../utils/StringUtil";
import UserStore from "../../stores/UserStore";

import IconLogo from '../../assets/icon_main_logo.png';
import IconUnselected from '../../assets/icon_unselected.png';
import IconSelected from '../../assets/icon_selected.png';
import IconArrow from '../../assets/icon_arrow.png';
import IconWechatSmall from '../../assets/icon_wx_small.png';
import IconAngle from '../../assets/icon_triangle.png';
import IconEyeOpen from '../../assets/icon_eye_open.png';
import IconEyeClose from '../../assets/icon_eye_close.png';
import IconExchange from '../../assets/icon_exchange.png';
import IconQQ from '../../assets/icon_qq.webp';
import IconWechat from '../../assets/icon_wx.png';
import IconClose from '../../assets/icon_close_modal.png';



export default () => {
    const [loginType, setLoginType] = useState<'quick' | 'input'>('input');
    const [checked, setChecked] = useState<boolean>(false);
    const [visiblePwd, setVisiblePwd] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const navigation = useNavigation<StackNavigationProp<any>>();
    const canLogin = phone.length === 13 && pwd.length > 6 && checked;

    const renderProtoco = () => {
        const styles = StyleSheet.create({
            protocoLayout: {
                width: 'auto',
                marginHorizontal: 'auto',
                flexDirection: 'row',
                alignItems: 'flex-start',
            },
            radioButton: {
                width: 16,
                height: 16,
                marginRight: 10
            },
            protocoText: {
                fontSize: 12,
                color: '#000000'
            },
            textMuted: {
                color: '#888888'
            },
        })

        return (
            <View style={styles.protocoLayout}>
                <TouchableOpacity
                    activeOpacity={.8}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                >
                    <Image source={checked ? IconSelected : IconUnselected} style={styles.radioButton} />
                </TouchableOpacity>
                <Text style={styles.protocoText}>
                    <Text style={[styles.protocoText, styles.textMuted]}>我已阅读并同意</Text>
                    <Text onPress={() => {
                        Linking.openURL('https://www.baidu.com');
                    }}>
                        《用户协议》
                    </Text>
                    和
                    <Text
                        onPress={() => {
                            Linking.openURL('https://sina.cn');
                        }}
                    >
                        《隐式政策》
                    </Text>
                </Text>
            </View>
        );
    }

    const renderQuickLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                flexDirection: 'column-reverse',
                alignItems: 'center',
                paddingHorizontal: 40,
                paddingVertical: 30
            },
            logo: {
                width: 160,
                height: 84,
                marginBottom: 200,
                resizeMode: 'contain'
            },
            otherLoginButton: {
                flexDirection: 'row',
                padding: 10,
                marginBottom: 100,
                alignItems: 'center'
            },
            otherLoginText: {
                fontSize: 13,
                color: '#333333',
                marginRight: 10
            },
            iconArrow: {
                width: 14,
                height: 14,
                resizeMode: 'contain',
                transform: [{ rotate: '180deg' }]
            },
            wechatLoginButton: {
                marginBottom: 16,
                backgroundColor: '#05c160',
                width: '100%',
                height: 56,
                borderRadius: 28,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            },
            wechatLoginIcon: {
                width: 40,
                height: 40
            },
            LoginButtonText: {
                fontSize: 16,
                color: '#ffffff'
            },
        })
        return (
            <View style={styles.root}>
                {renderProtoco()}
                <TouchableOpacity
                    style={styles.otherLoginButton}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setLoginType('input');
                    }}
                >
                    <Text style={styles.otherLoginText}>其他登录方式</Text>
                    <Image source={IconArrow} style={styles.iconArrow} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.wechatLoginButton}
                    activeOpacity={.7}
                >
                    <Image source={IconWechatSmall} style={styles.wechatLoginIcon} />
                    <Text style={styles.LoginButtonText}>微信登录</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.wechatLoginButton, {
                    backgroundColor: '#ff2442',
                    marginBottom: 20
                }]}>
                    <Text style={styles.LoginButtonText}>一键登录</Text>
                </TouchableOpacity>
                <Image source={IconLogo} style={styles.logo} />
            </View>
        )
    }

    const onLoginPress = async () => {
        const purePhone = replaceBlank(phone);
        UserStore.requestLogin(purePhone, pwd, (success: boolean) => {
            if (success) {
                navigation.replace('mainTab');
            } else {
                Toast.show('登录失败，请检查用户名和密码是否正确', {
                    backgroundColor: '#fff',
                    textColor: '#222',
                    opacity: .8,
                    duration: 2000,
                    position: Toast.positions.BOTTOM
                })
            }
        })
    }

    const renderInputLogin = () => {
        const styles = StyleSheet.create({
            root: {
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: 48
            },
            title: {
                fontSize: 24,
                color: '#121212',
                marginTop: 80,
                fontWeight: 'bold',
                marginBottom: 4
            },
            notice: {
                fontSize: 12,
                color: '#6a6a6a',
                marginBottom: 60
            },
            inputLayout: {
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: '#ddd',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderStyle: 'solid',
                marginBottom: 10
            },
            areaCode: {
                fontSize: 16,
                color: '#999',
                marginRight: 4
            },
            angle: {
                width: 12,
                height: 6,
                marginRight: 12
            },
            input: {
                flex: 1,
                height: 42,
                backgroundColor: 'transparent',
                textAlign: 'left',
                textAlignVertical: 'center',
                fontSize: 16,
                color: '#333',
            },
            visiblePwd: {
                width: 20,
                height: 16,
                tintColor: '#ddd',
                marginLeft: 6
            },
            visiblePwdTouch: {
                padding: 4
            },
            changeLayout: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            changeImage: {
                width: 14,
                height: 7,
                marginRight: 4,
                tintColor: '#0b0b23'
            },
            changeText: {
                fontSize: 12,
                flex: 1,
                color: '#0b0b23'
            },
            forgetPwd: {
                fontSize: 12,
                color: '#0b0b23'
            },
            loginButton: {
                backgroundColor: '#ff2442',
                height: 56,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 28,
                marginVertical: 22,
                width: '100%'
            },
            loginButtonText: {
                fontSize: 20,
                color: '#ffffff'
            },
            quickLayout: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 60,
                width: '100%'
            },
            quickIcon: {
                width: 48,
                height: 48,
            },
            close: {
                position: 'absolute',
                top: 32,
                left: 32
            },
            closeIcon: {
                width: 32,
                height: 32,
                tintColor: '#888'
            }
        })
        return (
            <View style={styles.root}>
                <Text style={styles.title}>账号密码登录</Text>
                <Text style={styles.notice}>未注册的账号登录后自动注册</Text>
                <View style={styles.inputLayout}>
                    <Text style={styles.areaCode}>+86</Text>
                    <Image source={IconAngle} style={styles.angle} />
                    <TextInput
                        style={styles.input}
                        placeholder="请输入手机号"
                        autoFocus={false}
                        keyboardType="number-pad"
                        maxLength={13}
                        value={phone}
                        onChangeText={(text: string) => {
                            setPhone(fromatPhone(text));
                        }}
                    />
                </View>
                <View style={styles.inputLayout}>
                    <TextInput
                        style={styles.input}
                        placeholder="请输入密码"
                        autoFocus={false}
                        maxLength={16}
                        secureTextEntry={!visiblePwd}
                        value={pwd}
                        onChangeText={text => {
                            setPwd(text);
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setVisiblePwd(!visiblePwd);
                            console.log('press');
                        }}
                        activeOpacity={.7}
                        style={styles.visiblePwdTouch}
                    >
                        <Image source={visiblePwd ? IconEyeOpen : IconEyeClose} style={styles.visiblePwd} />
                    </TouchableOpacity>
                </View>
                <View style={styles.changeLayout}>
                    <Image source={IconExchange} style={styles.changeImage} />
                    <Text style={styles.changeText}>验证码登录</Text>
                    <Text style={styles.forgetPwd}>忘记密码？</Text>
                </View>
                <TouchableOpacity
                    style={[styles.loginButton, canLogin ? null : { backgroundColor: '#ddd' }]}
                    activeOpacity={.8}
                    disabled={!canLogin}
                    onPress={onLoginPress}
                >
                    <Text style={styles.loginButtonText}>登录</Text>
                </TouchableOpacity>
                {renderProtoco()}
                <View style={styles.quickLayout}>
                    <Image source={IconWechat} style={[styles.quickIcon, { marginLeft: 20 }]} />
                    <Image source={IconQQ} style={[styles.quickIcon, { marginRight: 20 }]} />
                </View>
                <TouchableOpacity
                    style={styles.close}
                    onPress={() => {
                        LayoutAnimation.easeInEaseOut();
                        setLoginType('quick');
                    }}
                >
                    <Image source={IconClose} style={styles.closeIcon} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.root}>
            {loginType === 'quick' ? renderQuickLogin() : renderInputLogin()}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    }
});