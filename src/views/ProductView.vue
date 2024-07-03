<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>商品管理</h1>
                <button  @click="showAddModal">+ 新增商品</button>
            </div>
            <div class="wrap-table">
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
                            <button @click="editproduct(product)" class="edit">編輯</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
            
        </div>
    </section>
    <div class="modal" v-if="showAddQuestionModal || showEditQuestionModal">
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="saveQuestion">
                    <!-- 問題題目輸入 -->
                    <label for="question">問題題目</label>
                    <input type="text" id="question" v-model="currentQuestion.question" required />

                    <!-- 正確答案選項選擇 -->
                    <label for="answer">正確答案選項</label>
                    <select id="answer" v-model="currentQuestion.answer" required>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <!-- 正確答案文字輸入 -->
                    <label for="correctAnswer">正確答案文字</label>
                    <input type="text" id="correctAnswer" v-model="currentQuestion.correctAnswer" required />

                    <!-- 解答解釋輸入 -->
                    <label for="explanation">解答解釋</label>
                    <textarea id="explanation" v-model="currentQuestion.explanation" required></textarea>

                    <!-- 解答圖片上傳 -->
                    <label for="answer_image">解答圖片</label>
                    <input
                        type="file"
                        id="answer_image"
                        @change="handleImageUpload($event, 'answer')"
                    />
                    <input
                        type="text"
                        v-model="currentQuestion.answer_image"
                        placeholder="圖片檔名"
                    />

                    <!-- 選項內容和圖片輸入 -->
                    <template v-for="option in currentQuestion.options" :key="option.key">
                        <label :for="'option_' + option.key">{{ option.key }}選項內容</label>
                        <input :id="'option_' + option.key" v-model="option.text" required />

                        <label :for="'option_' + option.key + '_image'">{{ option.key }}選項圖片</label>
                        <input
                            type="file"
                            :id="'option_' + option.key + '_image'"
                            @change="handleImageUpload($event, option.key)"
                        />
                        <input type="text" v-model="option.img" placeholder="圖片檔名" />
                    </template>

                    <!-- 提交按鈕 -->
                    <button type="submit">{{ modalAction }}</button>
                </form>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            addSwitch: false,
            // showAddQuestionModal: false, // 控制添加問題模態框的顯示
            // showEditQuestionModal: false, // 控制編輯問題模態框的顯示
            // product: [
            //     {
            //         n_no: 'A001',
            //         n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
            //         p_img: 'pumpkin.png',
            //         n_time: '2024-06-04',
            //         p_name: '南瓜',
            //         pc_no: '蔬果',
            //         f_no: '黑壓壓農場',
            //         p_fee: 600,
            //         n_status: '',
            //         isActive: false,
            //         isClick: false
            //     },
            //     {
            //         n_no: 'A002',
            //         n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
            //         p_img: 'taro.png',
            //         n_time: '2024-06-04',
            //         p_name: '芋頭',
            //         pc_no: '蔬果',
            //         f_no: '嘿嘿齁農場',
            //         p_fee: 600,
            //         n_status: '',
            //         isActive: false,
            //         isClick: false
            //     },
            //     {
            //         n_no: 'A003',
            //         n_topic: '永續食農 傳承共榮，第一屆國家食農教育傑出貢獻獎啟動徵選',
            //         p_img: 'strawberry2.png',
            //         n_time: '2024-06-04',
            //         p_name: '草莓',
            //         pc_no: '蔬果',
            //         f_no: '逼逼波農場',
            //         p_fee: 600,
            //         n_status: '',
            //         isActive: false,
            //         isClick: false
            //     }
            // ]
        }
    },
    methods: {
        // toggleStatus(user) {
        //     user.status = user.status === '正常' ? '停用' : '正常'
        // },
        parsePic(file) {
            return new URL(`../assets/image/${file}`, import.meta.url).href
        },
        addAdmin(event) {
            event.stopPropagation() // 阻止事件冒泡
            if (this.addSwitch === false) {
                this.addSwitch = true
                console.log(this.addSwitch)
            } else {
                this.addSwitch = false
                ;(this.am_password = ''), (this.am_level = ''), (this.am_status = '')
            }
        },
        confirm() {
            if (this.am_password === '' || this.am_level === '' || this.am_status === '') {
                alert('請填完所有欄位')
                return false
            }
            const url = `http://localhost/php_g4/get_question.php`
            let body = {
                am_account: this.am_account,
                am_password: this.am_password,
                am_level: this.am_level,
                am_status: this.am_status
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((json) => {
                    this.data = json
                    if (this.data.code === 200) {
                        alert('新增成功')
                        this.addSwitch = false
                        this.fetchData() // 新增成功後重新獲取資料
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        editQuestion(question) {
            this.currentQuestion = JSON.parse(JSON.stringify(question));
            this.modalTitle = '編輯商品';
            this.modalAction = '更新';
            this.showEditQuestionModal = true;
        },
        // 顯示添加新問題的模態框
        showAddModal() {
            this.currentQuestion = this.getEmptyQuestion();
            this.modalTitle = '新增商品';
            this.modalAction = '新增';
            this.showAddQuestionModal = true;
        },
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
        .wrap-table{
            //有scrollbar
            width: 100%;
            height: 75%;
            overflow: auto;
            margin-top: 30px;
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
}
.section-addAdmin {
    background-color: hsla(0, 0%, 0%, 0.7);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 21;
    top: 0;
    .addAdmin {
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
