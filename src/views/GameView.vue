<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>食農問答管理</h1>
                <button>+ 新增題目</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">題目編號</th>
                        <th scope="col">題目</th>
                        <th scope="col">正確答案</th>
                        <th scope="col">狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in question" :key="user.q_no">
                        <td>{{ user.q_no }}</td>
                        <td>{{ user.q_question }}</td>
                        <td>{{ user.q_answer }}</td>
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
            question: [
                {
                    q_no: '001',
                    q_question: '哪種農業方式最有利於維護生物多樣性？',
                    q_explain: '',
                    q_answer: '混合農業',
                    ao_ordertime: '2024/06/11',
                    ao_status: '正常'
                },
                {
                    q_no: '002',
                    q_question: '哪一種肥料來源對環境影響最小？',
                    q_explain: '',
                    q_answer: '有機肥料',
                    ao_ordertime: '2024/06/09',
                    ao_status: '正常'
                },
                {
                    q_no: '003',
                    q_question: '哪一種作物最適合輪作保持土壤健康？',
                    q_explain: '',
                    q_answer: '豆類',
                    ao_ordertime: '2024/06/03',
                    ao_status: '取消'
                },
                {
                    q_no: '004',
                    q_question: '下列哪種灌溉技術最節水？',
                    q_explain: '',
                    q_answer: '滴灌',
                    ao_ordertime: '2024/06/02',
                    ao_status: '正常'
                },
                {
                    q_no: '005',
                    q_question: '有機農業中禁止使用哪一類物質？',
                    q_explain: '',
                    q_answer: '化學除草劑',
                    ao_ordertime: '2024/06/01',
                    ao_status: '停用'
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
