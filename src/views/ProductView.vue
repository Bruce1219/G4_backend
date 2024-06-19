<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>商品管理</h1>
                <button>+ 新增商品</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">商品編號</th>
                        <th scope="col">商品圖片</th>
                        <th scope="col">商品名稱</th>
                        <th scope="col">商品類別</th>
                        <th scope="col">農場名稱</th>
                        <th scope="col">金額</th>
                        <th scope="col">熱門商品</th>
                        <th scope="col">狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in product" :key="item.n_no">
                        <td>{{ item.n_no }}</td>
                        <td>
                            <div class="pic">
                                <img :src="parsePic(item.p_img)" alt="最新消息圖片" />
                            </div>
                        </td>
                        <td>{{ item.p_name }}</td>
                        <td>{{ item.pc_no }}</td>
                        <td>{{ item.f_no }}</td>
                        <td>NT$ {{ item.p_fee }}</td>
                        <td><input type="checkbox" /><span>請勾選</span></td>
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
            product: [
                {
                    n_no: 'A001',
                    n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
                    p_img: 'pumpkin.png',
                    n_time: '2024-06-04',
                    p_name: '南瓜',
                    pc_no: '蔬果',
                    f_no: '黑壓壓農場',
                    p_fee: 600,
                    n_status: '',
                    isActive: false,
                    isClick: false
                },
                {
                    n_no: 'A002',
                    n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
                    p_img: 'taro.png',
                    n_time: '2024-06-04',
                    p_name: '芋頭',
                    pc_no: '蔬果',
                    f_no: '嘿嘿齁農場',
                    p_fee: 600,
                    n_status: '',
                    isActive: false,
                    isClick: false
                },
                {
                    n_no: 'A003',
                    n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
                    p_img: 'strawberry2.png',
                    n_time: '2024-06-04',
                    p_name: '草莓',
                    pc_no: '蔬果',
                    f_no: '逼逼波農場',
                    p_fee: 600,
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
