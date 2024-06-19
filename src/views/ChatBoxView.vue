<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>客服機器人管理</h1>
                <button>+ 新增問答</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">問答編號</th>
                        <th scope="col">問題內容</th>
                        <th scope="col">回覆內容</th>
                        <th scope="col">狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in chatbox" :key="user.cb_no">
                        <td>{{ user.cb_no }}</td>
                        <td>{{ user.cb_content }}</td>
                        <td>{{ user.r_details }}</td>
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
            chatbox: [
                {
                    cb_no: '001',
                    cb_content: '訂單處理延遲',
                    r_details:
                        '尊敬的顧客，您好！非常抱歉您的訂單處理時間延長。我們目前正面臨較高的訂單量，導致處理速度有所延遲。請您放心，我們正在加緊處理您的訂單，並會盡快完成。',
                    ao_ordertime: '2024/06/11',
                    a_fee: 2000,
                    ao_status: '正常'
                },
                {
                    cb_no: '002',
                    cb_content: '產品質量問題',
                    r_details:
                        '親愛的顧客，對於您收到的不新鮮水果，我們深感抱歉。我們十分重視產品質量，對於此次經歷給您帶來的不便，我們感到非常遺憾。我們會立即安排退款或重新配送新鮮的水果給您。請您提供訂單號和相關照片，我們會迅速處理。感謝您的理解與支持。',
                    ao_ordertime: '2024/06/09',
                    a_fee: 0,
                    ao_status: '正常'
                },
                {
                    cb_no: '003',
                    cb_content: '支付和退款問題',
                    r_details:
                        '尊敬的顧客，您好！很抱歉聽到您在支付過程中遇到困難。我們建議您嘗試以下幾點：清理瀏覽器緩存，使用其他瀏覽器或設備，檢查網絡連接是否穩定。如果問題仍未解決，請您提供錯誤信息的截圖和詳細描述，我們的技術團隊會立即調查並協助解決。感謝您的耐心和合作。',
                    ao_ordertime: '2024/06/03',
                    a_fee: 0,
                    ao_status: '取消'
                }
                // {
                //     cb_no: '004',
                //     cb_content: '配送問題',
                //     r_details: '滴灌',
                //     ao_ordertime: '2024/06/02',
                //     a_fee: 500,
                //     ao_status: '正常'
                // },
                // {
                //     cb_no: '005',
                //     cb_content: '客服回應不及時',
                //     r_details: '化學除草劑',
                //     ao_ordertime: '2024/06/01',
                //     a_fee: 1500,
                //     ao_status: '停用'
                // }
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
                vertical-align: middle; /* 垂直居中對齊 */
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
                line-height: 1.5;
                text-align: center;
                border: solid 1px $darkGreen;
                vertical-align: middle; /* 垂直居中對齊 */
            }
            td:nth-child(3) {
                width: 600px;
                text-align: left;
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
                margin: 5px;
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
