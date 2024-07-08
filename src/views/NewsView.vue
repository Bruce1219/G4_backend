<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>最新消息管理</h1>
                <button>+ 新增消息</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">日期</th>
                        <th scope="col">消息圖片</th>
                        <th scope="col">標題</th>
                        <th scope="col">連結</th>
                        <th scope="col">狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in responseData" :key="item.n_no">
                        <td>{{ item.n_time }}</td>
                        <td>
                            <div class="pic">
                                <img :src="parsePic(item.n_img)" alt="最新消息圖片" />
                            </div>
                        </td>
                        <td>{{ item.n_article }}</td>
                        <td>{{ item.n_link }}</td>
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
        <div class="lightBoxWraper">
            <div class="lightBox">
                <div class="inputFeld">
                    <h2 v-show="addSwitch == true">新增消息</h2>
                    <h2 v-show="editSwitch">修改消息</h2>
                    <form action="#">
                        <div>
                            <span>消息編號:</span>
                            <input type="number" name="n_no" v-model="n_no">
                        </div>
                        <div>
                            <span>消息標題:</span>
                            <input type="text" v-model="n_topic" name="n_topic">
                        </div>
                        <div>
                            <span>消息圖片:</span>
                            <input type="file" name="n_img" @change="getfile($event)">
                        </div>
                        <div>
                            <span>消息發布日期:</span>
                            <input type="date" v-model="n_time" name="n_time">
                        </div>
                        <div>
                            <span>消息內文:</span>
                            <input type="text" v-model="n_article" name="n_article">
                        </div>
                        <div>
                            <span>消息外部連結:</span>
                            <input type="text" v-model="n_link" name="n_link">
                        </div>
                        <div>
                            <span>消息狀態:</span>
                            <select name="n_status" >
                                <option value="1">上架</option>
                                <option value="0">下架</option>
                            </select>
                        </div> 
                    </form>
                </div>
            </div>
         </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            responseData: [],
            addSwitch:true,
        }
    },
    methods: {
        parsePic(file) {
            return new URL(`../assets/image/${file}`, import.meta.url).href
        },
        fetchData() {
            fetch(`http://localhost/php_G4/newsList.php`,{
                method:'POST',
            })
            .then((res)=>res.json())
            .then((json)=>{
                console.log(json);
                this.responseData = json['data']['list']
            })
        }
    },
    mounted () {
        this.fetchData();
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
    .lightBoxWraper {
        display: none;
        position:fixed;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 0%, 0.7);
        z-index: 20;
        top:0%;
        .lightBox {
            &::-webkit-scrollbar{
                width: 1px;
            }
        }
        overflow: auto;
        width: 90%;
        height: 90%;
        background-color:$bcgw;
        border-radius:10px;
        padding:30px 20px;
        display:flex;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 10;
    }
    .inputFeld {

    }
}
</style>
