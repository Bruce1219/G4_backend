<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>活動訂單管理</h1>
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
                        <tr v-for="(user, index) in a_orders" :key="user.ao_no">
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
                        @click="toggleStatus()"
                        v-if="display.ao_status == 1"
                    >
                        取消報名
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            a_orders: [],
            display: [],
            addSwitch: false,
            ao_no: '',
            ao_status: '',
            a_no: '',
            ao_count: ''
        }
    },
    methods: {
        fetchData() {
            fetch(`http://localhost/php_g4/activity_orderlist.php`, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((json) => {
                    this.a_orders = json['data']['list']
                    console.log(json)
                    console.log(this.admin)
                })
        },
        checkAorder(event, index) {
            event.stopPropagation() // 阻止事件冒泡
            if (this.addSwitch === false) {
                this.addSwitch = true
                this.display = this.a_orders[index]
                // this.a_orders = this.a_orders[index]
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

            const url = `http://localhost/php_g4/updateUserActivity.php`
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
            // border-bottom: solid 1px grey;
        }
        form {
            margin-top: 10px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            // border-top: solid 1px grey;
            div {
                width: 80%;
                display: flex;
                justify-content: space-between;
                align-items: center;
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
