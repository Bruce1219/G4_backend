<template>
    <section class="d-flex justify-content-center">
        <div class="loginbox">
            <form>
                <div class="title">
                    <h1>管理員登入</h1>
                </div>
                <div class="mb-3">
                    <label for="am_account" class="form-label"></label>
                    <input
                        type="email"
                        class="form-control account"
                        id="am_account"
                        aria-describedby="emailHelp"
                        placeholder="帳號"
                        @blur="checkAcc()"
                        v-model="acc"
                    />
                    <span v-text="errorMsg.acc" class="wrong-msg"></span>
                </div>
                <div class="mb-3">
                    <label for="am_password" class="form-label"></label>
                    <input
                        type="password"
                        class="form-control password"
                        id="am_password"
                        placeholder="密碼"
                        @blur="checkPsw()"
                        v-model="psw"
                    />
                    <span v-text="errorMsg.psw" class="wrong-msg"></span>
                </div>
                <button @click="memLogin" class="loginbtn" type="button">登入</button>
            </form>
        </div>
    </section>
</template>

<script>
import { useAdminStore } from '@/store/adminState.js' // 引入 Pinia store
export default {
    data() {
        return {
            acc: '',
            psw: '',
            errorMsg: {
                acc: '',
                psw: ''
            }
        }
    },
    methods: {
        checkAcc() {
            if (this.acc === '') {
                this.errorMsg.acc = '*請輸入帳號'
            }
        },
        checkPsw() {
            if (this.psw === '') {
                this.errorMsg.psw = '*請輸入密碼'
            }
        },
        async memLogin() {
            try {
                const store = useAdminStore() // 獲取 Pinia store 的實例

                const response = await fetch(`${import.meta.env.BASE_URL}admin.json`)
                const users = await response.json()

                const loggedInUser = users.find(
                    (u) => u.account === this.acc && u.password === this.psw
                )
                if (loggedInUser) {
                    store.setCurrentUser(loggedInUser) // 設置當前用戶到 Pinia
                    alert('登入成功!')
                    this.acc = ''
                    this.psw = ''
                    this.$router.push('/indexsidebar/admin')
                } else {
                    alert('帳號或密碼錯誤!')
                    this.acc = ''
                    this.psw = ''
                }
            } catch (error) {
                console.error('登入失敗:', error)
                alert('登入失敗')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    padding: 100px;
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    .loginbox {
        width: 500px;
        height: 380px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow:
            0 15px 30px rgba(0, 0, 0, 0.2),
            0 10px 10px rgba(0, 0, 0, 0.2);
        background-color: #f5f4ea;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            .title {
                text-align: center;
                h1 {
                    font-family: $titleFont;
                    font-size: 2.25em;
                    cursor: default;
                }
            }
            .mb-3 {
                position: relative;
                .account {
                    &:focus {
                        outline: none;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
                .wrong-msg {
                    position: absolute;
                    bottom: -10px;
                    right: 0;
                    font-size: $desc;
                    color: $red;
                    padding: 0;
                    height: 12px;
                }
            }
            .mb-3 {
                .password {
                    &:focus {
                        outline: none;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
                .wrong-msg {
                    position: absolute;
                    bottom: -10px;
                    right: 0;
                    font-size: $desc;
                    color: $red;
                    padding: 0;
                    height: 12px;
                }
            }
            .loginbtn {
                display: inline-block;
                width: 150px;
                margin-top: 20px;
                text-decoration: none;
                border-radius: 25px;
                border: 1px solid #eee;
                background-color: #144433;
                color: #fff;
                font-size: 1rem;
                font-weight: bold;
                padding: 10px 55px;
                letter-spacing: 1px;
                transition: transform 0.5s ease-in;
                transition: 0.5s;
                text-align: center;
                &:active {
                    transform: scale(0.9);
                }
                &:hover {
                    background-color: #fff;
                    color: #144433;
                    border: solid 1px #144433;
                }
                &:focus {
                    outline: none;
                    &::placeholder {
                        color: transparent;
                    }
                }
            }
        }
    }
}
</style>
