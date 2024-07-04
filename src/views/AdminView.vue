<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>管理員管理</h1>
                <button v-if="currentUser && currentUser.am_level == '1'" @click="addAdmin($event)">
                    + 新增管理員
                </button>
            </div>
            <div class="wrap-table">
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
                        <tr v-for="user in admin" :key="user.am_no">
                            <td>{{ user.am_no }}</td>
                            <td>{{ user.am_level }}</td>
                            <td>{{ user.am_account }}</td>
                            <td>{{ user.am_password }}</td>
                            <td>
                                <button
                                    class="normal"
                                    v-if="user.am_status == 1"
                                    @click="toggleStatus(user)"
                                >
                                    正常
                                </button>
                                <button
                                    class="useless"
                                    v-if="user.am_status == 0"
                                    @click="toggleStatus(user)"
                                >
                                    停用
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div class="section-addAdmin" v-show="addSwitch" @click="addAdmin($event)">
        <div class="addAdmin" @click.stop>
            <span class="close" @click="addAdmin($event)">&times;</span>
            <h2>新增管理員</h2>
            <form action="#">
                <!-- <div>
                    <span>管理員代號 : </span>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="請輸入管理員編號"
                        v-model="am_no"
                    />
                </div> -->
                <!-- <div>
                    <span>管理員帳號 : </span>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="請輸入管理員帳號"
                        v-model="am_account"
                    />
                </div> -->
                <div>
                    <span>管理員密碼 : </span>
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="請輸入管理員密碼"
                        v-model="am_password"
                    />
                </div>
                <div>
                    <span>管理員等級 : </span>
                    <select v-model="am_level">
                        <option value="" disabled selected>請選擇管理員等級</option>
                        <option value="1">超級管理員</option>
                        <option value="2">一般管理員</option>
                    </select>
                </div>
                <div>
                    <span>管理員狀態 : </span>
                    <select v-model="am_status">
                        <option value="" disabled selected>請選擇管理員狀態</option>
                        <option value="1">正常</option>
                        <option value="0">停權</option>
                    </select>
                </div>
                <div class="button">
                    <button type="button" class="confirm" @click="confirm()">儲存</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useAdminStore } from '@/store/adminState.js' // 引入 Pinia store

export default {
    data() {
        return {
            currentAccount: null,
            admin: [],
            addSwitch: false,
            am_password: '',
            am_level: '',
            am_status: ''
        }
    },
    setup() {
        const store = useAdminStore()
        return {
            store
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        toggleStatus(user) {
            if (this.currentUser && this.currentUser.am_level === '1') {
                const newStatus = user.am_status == 1 ? 0 : 1

                // 发出请求更新数据库中的 am_status
                const url = `http://localhost/php_g4/updateAdmin.php`
                const body = {
                    am_no: user.am_no,
                    am_status: newStatus
                }

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(body)
                })
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.code === 200) {
                            alert('更新成功')
                            user.am_status = newStatus // 更新本地状态
                            this.fetchData() // 新增成功後重新獲取資料
                        } else {
                            alert(json.msg)
                        }
                    })
                    .catch((error) => {
                        console.error('Error:', error)
                    })
            }
        },
        addAdmin(event) {
            event.stopPropagation() // 阻止事件冒泡
            if (this.addSwitch === false) {
                this.addSwitch = true
                console.log(this.addSwitch)
            } else {
                this.addSwitch = false
                ;(this.am_password = ''), (this.am_level = ''), (this.am_status = '')
            }
        },
        loadCurrentAccount() {
            const user = localStorage.getItem('currentUser')
            if (user) {
                this.currentUser = JSON.parse(user)
            }
            console.log(this.currentUser)
        },
        fetchData() {
            let body = {
                page: 2
            }
            fetch(`http://localhost/php_g4/adminList.php`, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.admin = json['data']['list']
                    console.log(json)
                    console.log(this.admin)
                })
        },
        confirm() {
            if (this.am_password === '' || this.am_level === '' || this.am_status === '') {
                alert('請填完所有欄位')
                return false
            }
            const url = `http://localhost/php_g4/addAdmin.php`
            let body = {
                am_account: this.am_account,
                am_password: this.am_password,
                am_level: this.am_level,
                am_status: this.am_status
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((json) => {
                    this.data = json
                    if (this.data.code === 200) {
                        alert('新增成功')
                        this.addSwitch = false
                        this.am_password = ''
                        this.am_level = ''
                        this.am_status = ''
                        // this.addAdmin()
                        this.fetchData() // 新增成功後重新獲取資料
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
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
        height: 85vh; //寫死高度
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
        .wrap-table {
            //有scrollbar
            width: 100%;
            height: 75%;
            overflow: auto;
            margin-top: 30px;
            table {
                width: 100%;
                // margin-top: 30px;
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
                    background-color: $darkGreen;
                    color: #fff;
                }
                tr {
                    border-collapse: separate;
                    border-radius: 20px;
                    &:nth-child(even) {
                        background-color: #f8f8f8;
                    }
                }
                th {
                    color: #fff;
                    font-size: 16px;
                    padding: 10px;
                    // border: solid 1px $darkGreen;
                }
                td {
                    font-size: 16px;
                    margin: 0 3px;
                    line-height: 3;
                    text-align: center;
                    border-top: solid 1px #ddd;
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
}
.section-addAdmin {
    background-color: hsla(0, 0%, 0%, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    .addAdmin {
        overflow: auto;
        width: 50%;
        height: 75%;
        background-color: #fff;
        border-radius: 20px;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        &::-webkit-scrollbar {
            width: 1px;
        }
        .close {
            position: absolute;
            right: 20px;
            top: 20px;
            font-size: 20px;
            color: grey;
            transition: 0.5s;
            &:hover {
                color: $red;
            }
        }
        h2 {
            width: 80%;
            color: $darkGreen;
            font-size: 2.25rem;
            font-family: $titleFont;
            font-weight: bold;
            padding-bottom: 10px;
            // border-bottom: solid 1px grey;
        }
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            div {
                width: 80%;
                // display: flex;
                // justify-content: space-between;
                // align-items: center;
                margin: 10px 0;
                span {
                    color: $darkGreen;
                    font-weight: bold;
                    display: block;
                    margin-bottom: 10px;
                }
                input {
                    width: 100%;
                    height: 35px;
                    border: solid 1px grey;
                    border-radius: 5px;
                    padding: 8px 15px;
                    outline: none;
                    &:focus {
                        outline: none;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
                select {
                    width: 100%;
                    height: 35px;
                    border: solid 1px grey;
                    border-radius: 5px;
                    padding: 0 14px;
                    outline: none;
                    color: grey;
                    &:focus {
                        outline: none;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
            }
            .button {
                width: 100%;
                margin-top: 30px;
                display: flex;
                justify-content: center;
                button {
                    width: 80%;
                    display: inline-block;
                    text-decoration: none;
                    border-radius: 5px;
                    border: 1px solid #eee;
                    background-color: #144433;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    padding: 7px 100px;
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
                .cancel {
                    background-color: $red;
                    color: #fff;
                    &:hover {
                        background-color: #fff;
                        color: $red;
                        border: solid 1px $red;
                    }
                }
            }
        }
    }
}
</style>
