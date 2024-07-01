<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>活動管理</h1>
                <button @click="addActivity($event)">+ 新增活動</button>
            </div>
            <div class="wrap-table">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">活動編號</th>
                            <th scope="col">活動圖片</th>
                            <th scope="col">活動名稱</th>
                            <th scope="col">活動類別</th>
                            <th scope="col">報名上限</th>
                            <th scope="col">報名人數</th>
                            <th scope="col">金額</th>
                            <th scope="col">活動日期</th>
                            <th scope="col">狀態</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in activity" :key="item.a_no">
                            <td>{{ item.a_no }}</td>
                            <td>
                                <div class="pic">
                                    <img :src="parsePic(item.p_img)" alt="最新消息圖片" />
                                </div>
                            </td>
                            <td>{{ item.a_name }}</td>
                            <td>{{ item.c_no }}</td>
                            <td>{{ item.a_max }}人</td>
                            <td>{{ item.a_attendee }}人</td>
                            <td>NT$ {{ item.a_fee }}</td>
                            <td>{{ item.a_date }}</td>
                            <td>
                                <select name="" id="">
                                    <option value="">上架</option>
                                    <option value="">下架</option>
                                </select>
                            </td>
                            <td>
                                <button class="edit">編輯</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div class="section-addActivity" v-show="addSwitch" @click="addActivity($event)">
        <div class="addActivity" @click.stop>
            <h2>新增活動</h2>
            <form action="#">
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
                    <button type="button" class="cancel" @click="addActivity($event)">取消</button>
                    <button type="button" class="confirm" @click="confirm()">儲存</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addSwitch: false,
            activity: [
                {
                    a_no: 'A001',
                    p_img: 'act1.png',
                    a_date: '2024-06-04',
                    a_name: '有機農業的未來',
                    c_no: '講座',
                    a_max: 999,
                    a_attendee: 0,
                    a_fee: 500,
                    n_status: '',
                    isActive: false,
                    isClick: false
                },
                {
                    a_no: 'A002',
                    p_img: 'act2.png',
                    a_date: '2024-06-01',
                    a_name: '小農市集',
                    c_no: '市集',
                    a_max: 50,
                    a_attendee: 0,
                    a_fee: 0,
                    n_status: '',
                    isActive: false,
                    isClick: false
                },
                {
                    a_no: 'A002',
                    p_img: 'act2.png',
                    a_date: '2024-06-01',
                    a_name: '小農市集',
                    c_no: '市集',
                    a_max: 50,
                    a_attendee: 0,
                    a_fee: 0,
                    n_status: '',
                    isActive: false,
                    isClick: false
                },
                {
                    a_no: 'A002',
                    p_img: 'act2.png',
                    a_date: '2024-06-01',
                    a_name: '小農市集',
                    c_no: '市集',
                    a_max: 50,
                    a_attendee: 0,
                    a_fee: 0,
                    n_status: '',
                    isActive: false,
                    isClick: false
                }
            ]
        }
    },
    methods: {
        parsePic(file) {
            return new URL(`../assets/image/${file}`, import.meta.url).href
        },
        addActivity(event) {
            event.stopPropagation() // 阻止事件冒泡
            if (this.addSwitch === false) {
                this.addSwitch = true
                console.log(this.addSwitch)
            } else {
                this.addSwitch = false
                ;(this.am_password = ''), (this.am_level = ''), (this.am_status = '')
            }
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
                }
                tr {
                    border-collapse: separate;
                    border-radius: 20px;
                    vertical-align: middle; /* 垂直居中對齊 */
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
                    vertical-align: middle; /* 垂直居中對齊 */
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
                .pic {
                    display: flex;
                    align-items: center; /* 垂直居中對齊 */
                    justify-content: center; /* 水平居中對齊 */
                    padding: 5px;
                    img {
                        width: 100px;
                        height: 80px;
                        object-fit: cover;
                        // vertical-align: top;
                        display: block;
                        margin: 0 auto; /* 水平居中 */
                    }
                }
                select {
                    margin: 0 10px;
                }
                .edit {
                    // width: 20px;
                    color: #fff;
                    text-decoration: none;
                    background-color: $darkGreen;
                    border: none;
                    padding: 7px 20px;
                    margin: 5px 10px;
                    border-radius: 20px;
                    transition: 0.5s;
                    &:hover {
                        background-color: $red;
                    }
                }
            }
        }
    }
}
.section-addActivity {
    background-color: hsla(0, 0%, 0%, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    .addActivity {
        overflow: auto;
        width: 50%;
        height: 75%;
        background-color: $bcgw;
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
        h2 {
            color: $darkGreen;
            font-size: 2.25rem;
            font-family: $titleFont;
            font-weight: bold;
        }
        form {
            margin-top: 50px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            div {
                width: 80%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 10px 0;
                input {
                    width: 70%;
                    height: 35px;
                    border: solid 1px $darkGreen;
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
                    width: 70%;
                    height: 35px;
                    border: solid 1px $darkGreen;
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
                width: 35%;
                margin-top: 50px;
                button {
                    display: inline-block;
                    text-decoration: none;
                    border-radius: 25px;
                    border: 1px solid #eee;
                    background-color: #144433;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    padding: 7px 30px;
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
