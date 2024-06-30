<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>優惠卷管理</h1>
                <button>+ 新增優惠卷</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">優惠券編號</th>
                        <th scope="col">優惠券券號</th>
                        <th scope="col">優惠券折數</th>
                        <th scope="col">優惠券有效天數</th>
                        <th scope="col">使用狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in coupon" :key="user.c_no">
                        <td>{{ user.c_no }}</td>
                        <td>{{ user.c_name }}</td>
                        <td>{{ user.c_percentage }}</td>
                        <td>{{ user.c_end }} 天</td>
                        <td>
                            <select name="" id="">
                                <option value="">可以使用</option>
                                <option value="">無法使用</option>
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
            coupon: [
                {
                    c_no: 'C001',
                    c_name: 'CCC8888',
                    c_percentage: 0.95,
                    c_end: '30',
                    po_total: 500,
                    status: '正常'
                },
                {
                    c_no: 'C002',
                    c_name: 'CCC8585',
                    c_percentage: 0.9,
                    c_end: '30',
                    po_total: 500,
                    status: '正常'
                },
                {
                    c_no: 'C003',
                    c_name: 'CCC9999',
                    c_percentage: 0.85,
                    c_end: '30',
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
