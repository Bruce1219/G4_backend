<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>商品訂單管理</h1>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">訂單編號</th>
                        <th scope="col">會員編號</th>
                        <th scope="col">訂購人</th>
                        <th scope="col">訂單日期</th>
                        <th scope="col">金額</th>
                        <th scope="col">訂單狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in p_orders" :key="user.po_no">
                        <td>{{ user.po_no }}</td>
                        <td>{{ user.m_no }}</td>
                        <td>{{ user.po_name }}</td>
                        <td>{{ user.po_time }}</td>
                        <td>NT$ {{ user.po_total }}</td>
                        <td>
                            <select name="" id="">
                                <option value="">完成</option>
                                <option value="">已出貨</option>
                                <option value="">備貨中</option>
                                <option value="">審核中</option>
                                <option value="">已取消</option>
                            </select>
                        </td>
                        <td>
                            <button class="edit">查看</button>
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
            p_orders: [
                {
                    po_no: 'A001',
                    m_no: '001',
                    po_name: '張員瑛',
                    po_time: '2024/06/11',
                    po_total: 500,
                    status: '正常'
                },
                {
                    po_no: 'A002',
                    m_no: '002',
                    po_name: '金采源',
                    po_time: '2024/06/09',
                    po_total: 500,

                    status: '正常'
                },
                {
                    po_no: 'A003',
                    m_no: '003',
                    po_name: '安兪真',
                    po_time: '2024/06/03',
                    po_total: 500,

                    status: '停用'
                },
                {
                    po_no: 'A004',
                    m_no: '004',
                    po_name: 'Sakura',
                    po_time: '2024/06/02',
                    po_total: 500,

                    status: '正常'
                },
                {
                    po_no: 'A005',
                    m_no: '005',
                    po_name: 'Karina',
                    po_time: '2024/06/01',
                    po_total: 500,

                    status: '停用'
                }
            ]
        }
    },
    methods: {}
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
            .edit {
                // width: 20px;
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: none;
                padding: 7px 20px;
                margin: 5px 0;
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
