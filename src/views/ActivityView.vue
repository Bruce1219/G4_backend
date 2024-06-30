<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>活動管理</h1>
                <button>+ 新增活動</button>
            </div>
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
    </section>
</template>

<script>
export default {
    data() {
        return {
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
                }
            ]
        }
    },
    methods: {
        // toggleStatus(user) {
        //     user.status = user.status === '正常' ? '停用' : '正常'
        // },
        parsePic(file) {
            return new URL(`../assets/image/${file}`, import.meta.url).href
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
</style>
