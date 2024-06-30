<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>會員管理</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">會員名稱</th>
                        <th scope="col">年齡</th>
                        <th scope="col">帳號</th>
                        <th scope="col">電話</th>
                        <th scope="col">地址</th>
                        <th scope="col">狀態</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in member" :key="user.m_no">
                        <td>{{ user.m_name }}</td>
                        <td>{{ user.m_age }}</td>
                        <td>{{ user.m_account }}</td>
                        <td>{{ user.m_phone }}</td>
                        <td>{{ user.m_address }}</td>
                        <td>
                            <button
                                class="normal"
                                v-if="user.m_status === '正常'"
                                @click="toggleStatus(user)"
                            >
                                正常
                            </button>
                            <button
                                class="useless"
                                v-if="user.m_status === '停權'"
                                @click="toggleStatus(user)"
                            >
                                停權
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            member: [
                {
                    m_no: '001',
                    m_name: '張小凡',
                    m_age: 28,
                    m_account: 'xiaoming.zhang@example.com',
                    m_phone: '0912345678',
                    m_address: '台北市中正區信義路一段123號',
                    m_status: '正常'
                },
                {
                    m_no: '002',
                    m_name: '薩爾達',
                    m_age: 33,
                    m_account: 'meili.li@example.com',
                    m_phone: '0912345678',
                    m_address: '台北市中正區信義路一段123號',
                    m_status: '正常'
                },
                {
                    m_no: '003',
                    m_name: '大鼓祥平',
                    m_age: 32,
                    m_account: 'dahua.wang@example.com',
                    m_phone: '0912345678',
                    m_address: '台北市中正區信義路一段123號',
                    m_status: '正常'
                },
                {
                    m_no: '004',
                    m_name: '五條悟',
                    m_age: 44,
                    m_account: 'shufen.chen@example.com',
                    m_phone: '0912345678',
                    m_address: '台北市中正區信義路一段123號',
                    m_status: '正常'
                },
                {
                    m_no: '005',
                    m_name: '孫安卓',
                    m_age: 18,
                    m_account: 'zhiqiang.lin@example.com',
                    m_phone: '0912345678',
                    m_address: '台北市中正區信義路一段123號',
                    m_status: '停權'
                }
            ]
        }
    },
    methods: {
        toggleStatus(user) {
            user.m_status = user.m_status === '正常' ? '停權' : '正常'
        }
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
                margin: 5px 10px;
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
                margin: 5px 10px;
                border-radius: 20px;
                transition: 0.5s;
                &:hover {
                    background-color: $darkGreen;
                }
            }
        }
    }
}
</style>
