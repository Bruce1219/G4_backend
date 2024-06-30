<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>管理員管理</h1>
                <button v-if="this.currentAccount === 'admin001'" @click="addAdmin">
                    + 新增管理員
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">管理員代號</th>
                        <th scope="col">等級</th>
                        <th scope="col">帳號</th>
                        <th scope="col">密碼</th>
                        <th scope="col">狀態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in admin" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.level }}</td>
                        <td>{{ user.account }}</td>
                        <td>{{ user.password }}</td>
                        <td>
                            <button
                                class="normal"
                                v-if="user.status === 1"
                                @click="toggleStatus(user)"
                            >
                                正常
                            </button>
                            <button
                                class="useless"
                                v-if="user.status === 0"
                                @click="toggleStatus(user)"
                            >
                                停用
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
    <div class="section-addAdmin" v-show="addSwitch">
        <div class="addAdmin">
            <h2>新增管理員</h2>
        </div>
    </div>
</template>

<script>
import { useAdminStore } from '@/store/adminState.js' // 引入 Pinia store

export default {
    data() {
        return {
            // admin: [
            //     {
            //         id: '001',
            //         level: 1,
            //         account: 'xiaoming.zhang@example.com',
            //         password: '111111',
            //         status: ''
            //     },
            //     {
            //         id: '002',
            //         level: 2,
            //         account: 'meili.li@example.com',
            //         password: '00000',
            //         status: '正常'
            //     },
            //     {
            //         id: '003',
            //         level: 2,
            //         account: 'dahua.wang@example.com',
            //         password: '22222',
            //         status: '停用'
            //     },
            //     {
            //         id: '004',
            //         level: 2,
            //         account: 'shufen.chen@example.com',
            //         password: '33333',
            //         status: '正常'
            //     },
            //     {
            //         id: '005',
            //         level: 2,
            //         account: 'zhiqiang.lin@example.com',
            //         password: '4444',
            //         status: '停用'
            //     }
            // ]
            currentAccount: null,
            admin: [],
            addSwitch: false
        }
    },
    setup() {
        const store = useAdminStore()
        return {
            store
        }
    },
    mounted() {
        fetch(`${import.meta.env.BASE_URL}admin.json`)
            .then((res) => res.json())
            .then((json) => {
                this.admin = json
            })
    },
    methods: {
        toggleStatus(user) {
            if (this.currentAccount === 'admin001') {
                user.status = user.status === 1 ? 0 : 1
                console.log(user.status)
            }
        },
        addAdmin() {
            this.addSwitch = true
        },
        loadCurrentAccount() {
            const user = localStorage.getItem('currentUser')
            if (user) {
                const parsedUser = JSON.parse(user)
                this.currentAccount = parsedUser.am_account // 使用正確的鍵名
            }
        }
    },
    created() {
        this.loadCurrentAccount()
    }
}
</script>

<style lang="scss" scoped>
.section {
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    cursor: default;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    .container {
        width: 80%;
        padding: 30px;
        margin: 0;
        div {
            display: flex;
            justify-content: space-between;
            h1 {
                font-size: 2.25em;
                font-family: $titleFont;
                font-weight: bold;
            }
            button {
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: solid 1px transparent;
                padding: 7px 15px;
                margin: 5px 0;
                border-radius: 10px;
                transition: 0.5s;
                box-sizing: border-box;
                &:hover {
                    background-color: #fff;
                    border: solid 1px $darkGreen;
                    color: $darkGreen;
                }
            }
        }

        table {
            width: 100%;
            margin-top: 30px;
            // border: solid 1px $darkGreen;
            background-color: #fff;
            border-collapse: separate;
            border-spacing: 0;
            thead {
                line-height: 3;
                text-align: center;
                font-weight: bold;
                border-collapse: separate;
                border-radius: 20px;
            }
            tr {
                border-collapse: separate;
                border-radius: 20px;
            }
            th {
                color: #144433;
                font-size: 16px;
                padding: 10px;
                border: solid 1px $darkGreen;
            }
            td {
                font-size: 16px;
                margin: 0 3px;
                line-height: 3;
                text-align: center;
                border: solid 1px $darkGreen;
            }
            /*第一欄第一列：左上*/
            tr:first-child th:first-child {
                border-top-left-radius: 20px;
            }
            /*第一欄最後列：左下*/
            tr:last-child td:first-child {
                border-bottom-left-radius: 20px;
            }
            /*最後欄第一列：右上*/
            tr:first-child th:last-child {
                border-top-right-radius: 20px;
            }
            /*最後欄第一列：右下*/
            tr:last-child td:last-child {
                border-bottom-right-radius: 20px;
            }
            td:last-child {
                line-height: 1;
            }
            .normal {
                // width: 20px;
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: none;
                padding: 7px 15px;
                margin: 5px 0;
                border-radius: 20px;
                transition: 0.5s;
                &:hover {
                    background-color: $red;
                }
            }
            .useless {
                // width: 20px;
                color: #fff;
                text-decoration: none;
                background-color: $red;
                border: none;
                padding: 7px 15px;
                margin: 5px 0;
                border-radius: 20px;
                transition: 0.5s;
                &:hover {
                    background-color: $darkGreen;
                }
            }
        }
    }
}
.section-addAdmin {
    background-color: hsla(0, 0%, 0%, 0.25);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    .addAdmin {
        overflow: auto;
        width: 73.64vw;
        height: 45vw;
        background-color: #f5efeb;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
}
</style>
