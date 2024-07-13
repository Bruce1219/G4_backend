<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>活動訂單管理</h1>
                <div class="filter-product" @change="activedClass()">
                    <select name="filter" id="filter">
                        <option value="3">全部</option>
                        <option value="1">已報名</option>
                        <option value="0">已取消</option>
                    </select>
                </div>
            </div>
            <div class="wrap-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">訂單編號</th>
                            <th scope="col">活動編號</th>
                            <th scope="col">會員編號</th>
                            <th scope="col">報名人數</th>
                            <th scope="col">報名時間</th>
                            <th scope="col">金額</th>
                            <th scope="col">訂單狀態</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in filterDataDisplay" :key="user.ao_no">
                            <td>{{ user.ao_no }}</td>
                            <td>{{ user.a_no }}</td>
                            <td>{{ user.m_no }}</td>
                            <td>{{ user.ao_count }} 人</td>
                            <td>{{ user.ao_ordertime }}</td>
                            <td>NT$ {{ user.ao_totalfee }}</td>
                            <td>
                                <span class="normal" v-if="user.ao_status == 1">已報名</span>
                                <span class="cancel" v-if="user.ao_status == 0">已取消</span>
                            </td>
                            <td>
                                <button class="edit" @click="checkAorder($event, index)">
                                    查看
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div class="section-checkAorder" v-show="addSwitch" @click="checkAorder($event)">
        <div class="checkAorder" @click.stop>
            <span class="close" @click="checkAorder($event)">&times;</span>
            <h2>活動訂單詳情</h2>
            <form action="#">
                <div>
                    <span>訂單編號 : </span>
                    <span class="item">{{ display.ao_no }}</span>
                </div>
                <div>
                    <span>活動編號 : </span>
                    <span class="item">{{ display.a_no }}</span>
                </div>
                <div>
                    <span>會員編號 : </span>
                    <span class="item">{{ display.m_no }}</span>
                </div>
                <div>
                    <span>報名人數 : </span>
                    <span class="item">{{ display.ao_count }}人</span>
                </div>
                <div>
                    <span>報名日期 : </span>
                    <span class="item">{{ formatDate(display.ao_ordertime) }}</span>
                </div>
                <div>
                    <span>報名狀態 : </span>
                    <span v-if="display.ao_status == 1" class="item">已報名</span>
                    <span v-if="display.ao_status == 0" class="item cancelStatus">已取消</span>
                </div>
                <div>
                    <span>總金額 : </span>
                    <span class="item">NT${{ display.ao_totalfee }}元</span>
                </div>
                <div>
                    <span>活動分類 : </span>
                    <span class="item">{{ display.c_no }}</span>
                </div>
                <div>
                    <span>活動名稱 : </span>
                    <span class="item">{{ display.a_name }}</span>
                </div>
                <div>
                    <span>活動地點 : </span>
                    <span class="item">{{ display.a_loc }}</span>
                </div>
                <div>
                    <span>活動金額 : </span>
                    <span class="item">NT${{ display.a_fee }}元</span>
                </div>
                <div>
                    <span>活動開始日期 : </span>
                    <span class="item">{{ display.a_start_date }}</span>
                </div>
                <div>
                    <span>活動結束日期 : </span>
                    <span class="item">{{ display.a_end_date }}</span>
                </div>
                <div>
                    <span>活動時間 : </span>
                    <span class="item">{{ formatTime(display.a_time) }}</span>
                </div>
                <div>
                    <span>講師 : </span>
                    <span class="item">{{ display.a_teacher }}</span>
                </div>

                <div class="button">
                    <button
                        type="button"
                        class="confirm"
                        @click="click()"
                        v-if="display.ao_status == 1"
                    >
                        取消報名
                    </button>
                    <button type="button" class="confirm cancel" v-if="display.ao_status == 0">
                        已取消
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// import { toHandlers } from 'vue'

export default {
    data() {
        return {
            selectedNum: 0,
            a_orders: [],
            display: [],
            currentClass: '3',
            addSwitch: false,
            ao_no: '',
            ao_status: '',
            a_no: '',
            ao_count: ''
        }
    },
    computed: {
        filterDataDisplay() {
            // let filteredData = this.a_orders;
            // this.display = this.filteredData;
            // console.log(filteredData)
            if (this.currentClass === '3') {
                return this.a_orders
            } else {
                return this.a_orders.filter((user) => {
                    return user.ao_status == this.currentClass
                })
            }
        }
    },
    methods: {
        fetchData() {
            // const url = `http://localhost/php_g4/activity_orderlist.php`//本地
            const url = `${import.meta.env.VITE_API_URL}/activity_orderlist.php` //部屬
            fetch(url, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((json) => {
                    this.a_orders = json['data']['list']
                    console.log(json)
                    console.log(this.a_orders)
                    if (this.currentClass === '3') {
                        this.display = this.a_orders
                        console.log(this.display)
                    } else {
                        this.display = this.a_orders.filter((user) => {
                            return user.ao_status == this.currentClass
                        })
                    }
                })
        },
        checkAorder(event, index) {
            event.stopPropagation() // 阻止事件冒泡
            if (this.addSwitch === false) {
                this.addSwitch = true
                console.log(this.display)
                this.display = this.filterDataDisplay[index]
            } else {
                this.addSwitch = false
                this.display = []
            }
        },
        formatDate(dateTime) {
            if (!dateTime) {
                return ''
            }
            return dateTime.split(' ')[0]
        },
        formatTime(dateTime) {
            if (!dateTime) {
                return ''
            }
            return dateTime.split(' ')[1]
        },
        toggleStatus() {
            const newStatus = this.ao_status === 0

            // const url = `http://localhost/php_g4/updateUserActivity.php` //本地
            const url = `${import.meta.env.VITE_API_URL}/updateUserActivity.php` //部屬
            const body = {
                ao_no: this.display.ao_no,
                ao_status: newStatus,
                a_no: this.display.a_no,
                ao_count: this.display.ao_count
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.code === 200) {
                        alert('已取消報名')
                        this.fetchData()
                        this.addSwitch = false
                    } else {
                        alert(json.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        activedClass() {
            let activeClass = document.querySelector('#filter') // //偵測目前商品類別為何
            this.currentClass = activeClass.value
        },
        click() {
            let yes = confirm('確定取消?')
            if (yes) {
                this.toggleStatus()
            }
        }
    },
    mounted() {
        this.fetchData()
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
        max-width: none;
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
            .filter-product {
                display: flex;
                align-items: center;
                // margin-bottom: $mbbtwElement;
                select {
                    height: 30px;
                    width: 150px;
                    border: solid 1px $darkGreen;
                    font-family: $pFont;
                    $line-height: $fontBase;
                    font-size: $fontBase;
                    color: $darkGreen;
                    padding: 0 10px;
                    outline: none;
                    color: grey;
                    &:focus {
                        outline: none;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                    option {
                        background-color: #f3eeea;
                        border: 0px solid #f3eeea;
                    }
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
                .cancel {
                    color: $red;
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
                .edit {
                    // width: 20px;
                    color: #fff;
                    text-decoration: none;
                    background-color: $darkGreen;
                    border: solid 1px $darkGreen;
                    padding: 7px 20px;
                    margin: 5px 0;
                    border-radius: 20px;
                    transition: 0.5s;
                    &:hover {
                        background-color: #fff;
                        color: $darkGreen;
                        border: solid 1px $darkGreen;
                    }
                }
            }
        }
    }
}
.section-checkAorder {
    background-color: hsla(0, 0%, 0%, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    .checkAorder {
        overflow: auto;
        width: 40%;
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
            padding-bottom: 10px;
            color: $darkGreen;
            font-size: 2.25rem;
            font-family: $titleFont;
            font-weight: bold;
            border-bottom: solid 1px #d9d9d9;
        }
        form {
            margin-top: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // border-top: solid 1px #eee;
            div {
                width: 80%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // display: grid;
                // grid-template-columns: 1fr 2fr;
                margin: 15px 0;
                span {
                    color: $darkGreen;
                    font-weight: bold;
                }
                .item {
                    color: grey;
                    max-width: 60%;
                }
                .cancelStatus {
                    color: $red;
                }
            }
            .button {
                width: 100%;
                margin-top: 50px;
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
                    letter-spacing: 2px;
                    transition: transform 0.5s ease-in;
                    transition: 0.5s;
                    text-align: center;
                    &:active {
                        transform: scale(0.9);
                    }
                    &:hover {
                        background-color: $red;
                        color: #fff;
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
                    // &:hover {
                    //     background-color: #fff;
                    //     color: $red;
                    //     border: solid 1px $red;
                    // }
                }
            }
        }
    }
}
</style>
