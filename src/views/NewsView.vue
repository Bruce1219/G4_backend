<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>最新消息管理</h1>
                <button @click="addToggleButton()">+ 新增消息</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th scope="col">日期</th>
                        <th scope="col">消息圖片</th>
                        <th scope="col">標題</th>
                        <th scope="col">內文</th>
                        <th scope="col">連結</th>
                        <th scope="col">狀態</th>
                        <th scope="col">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in responseData" :key="item.n_no">
                        <td>{{ item.n_time }}</td>
                        <td>
                            <div class="pic">
                                <img :src="parsePic(item.n_img)" alt="最新消息圖片" />
                            </div>
                        </td>
                        <td>{{ item.n_topic }}</td>
                        <td>{{ item.n_article }}</td>
                        <td><a :href="item.n_link" target="_blank">連結</a></td>
                        <td v-show="item.n_status == 1">上架</td>
                        <td v-show="item.n_status == 0">下架</td>
                        <td>
                            <button class="edit" @click="editNews(index)">編輯</button>
                            <button class="delete edit" @click="deleteNews(index)">刪除</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="lightBoxWrapper" v-show="addSwitch || editSwitch">
            <div class="lightBox" ref="addLightBox">
                <h2 v-show="addSwitch">新增消息</h2>
                <h2 v-show="editSwitch">修改消息</h2>
                <form action="#">
                    <div>
                        <span>消息編號:</span>
                        <input type="number" name="n_no" v-model="n_no" disabled />
                    </div>
                    <div>
                        <span>消息標題:</span>
                        <input type="text" v-model="n_topic" name="n_topic" />
                    </div>
                    <div>
                        <label>
                            <span>消息圖片:</span>
                            <input
                                type="file"
                                name="n_img"
                                @change="getFile($event)"
                                ref="fileInput"
                            />
                            <span class="fakeBrowBTN" >選擇檔案</span>
                            <span>{{ n_img ? n_img  : '沒有選擇任何檔案' }}</span>
                        </label>
                    </div>
                    <div>
                        <span>消息發布日期:</span>
                        <input type="date" v-model="n_time" name="n_time" />
                    </div>
                    <div>
                        <span>消息內文:</span>
                        <textarea
                            name="n_article"
                            v-model="n_article"
                            rows="4"
                            cols="54"
                        ></textarea>
                    </div>
                    <div>
                        <span>消息外部連結:</span>
                        <input type="text" v-model="n_link" name="n_link" />
                    </div>
                    <div>
                        <span>消息狀態:</span>
                        <select name="n_status" v-model="n_status">
                            <option value="1">上架</option>
                            <option value="0">下架</option>
                        </select>
                    </div>
                </form>
                <div class="button-field" v-show="addSwitch">
                    <button type="button" class="cancel" @click="addToggleButton()">取消</button>
                    <button type="button" class="confirm" @click="addNewsConfirm()">確認</button>
                </div>
                <div class="button-field" v-show="editSwitch">
                    <button type="button" class="cancel" @click="editNews()">取消</button>
                    <button type="button" class="confirm" @click="editConfirm()">確認</button>
                </div>
            </div>
        </div>
        <div class="lightBoxWrapper delete-alert-field" v-show="deleteSwitch === true">
            <div class="delete-alert lightBox" @click.stop>
                <h2>確定要刪除!!</h2>
                <div class="button">
                    <button type="button" class="delete" @click="deleteNews()">取消</button>
                    <button class="cancel" @click="deleteConfirm()">刪除</button>
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
            addSwitch: false,
            editSwitch: false,
            deleteSwitch: false,
            n_no: '',
            n_topic: '',
            n_img: '',
            n_article: '',
            n_link: '',
            n_time: '',
            n_status: '',
            file: null,
            oldFileName: ''
        }
    },
    methods: {
        clearFile() {
            this.$refs.fileInput.value = '';
        },
        parsePic(file) {
            return `${import.meta.env.VITE_FILE_URL}news-img/${file}`;
        },
        fetchData() {
             const url = `${import.meta.env.VITE_API_URL}/newsList.php`;
            fetch(url, {
                method: 'POST'
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json)
                    this.responseData = json['data']['list']
                })
        },
        addToggleButton() {
            this.scrollToTop()
            this.clearFile()
            if (this.addSwitch === false) {
                this.addSwitch = true
                this.n_no = this.responseData.length + 1
            } else {
                this.addSwitch = false;
                this.n_no = '';
                this.n_topic = '';
                this.n_img = null;
                this.n_article = '';
                this.n_link = '';
                this.n_time = '';
                this.n_status = '';
                this.file = null
            }
            console.log(this.n_img)
        },
        addNewsConfirm() {
            const url = `${import.meta.env.VITE_API_URL}/addNews.php`;
            this.updateImage()
            // const url = `http://localhost/php_G4/addNews.php`
            let body = {
                n_no: this.n_no,
                n_link: this.n_link,
                n_article: this.n_article,
                n_img: this.n_img,
                n_time: this.n_time,
                n_topic: this.n_topic,
                n_status: this.n_status
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.responseData = json
                    if (
                        this.n_no != '' ||
                        this.n_topic != '' ||
                        this.n_img != '' ||
                        this.n_article != '' ||
                        this.n_link != '' ||
                        this.n_time != '' ||
                        this.n_status != ''
                    ) {
                        alert('新增成功!')
                        this.addSwitch = false
                        this.fetchData()
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        editNews(index) {
            this.scrollToTop()
            console.log(this.file)
            if (this.editSwitch === false) {
                this.editSwitch = true
                this.n_no = this.responseData[index].n_no
                this.n_img = this.responseData[index].n_img
                this.n_link = this.responseData[index].n_link
                this.n_article = this.responseData[index].n_article
                this.n_status = this.responseData[index].n_status
                this.n_time = this.responseData[index].n_time
                this.n_topic = this.responseData[index].n_topic
                this.oldFileName =
                    `${import.meta.env.VITE_API_URL}/ ${this.responseData[index].n_img}`
            } else {
                this.editSwitch = false
                this.n_no = '';
                this.n_topic = '';
                this.n_img = null;
                this.n_article = '';
                this.n_link = '';
                this.n_time = '';
                this.n_status = '';
                this.file = null
                this.oldFileName = '';
            }
        },
        editConfirm() {
            this.updateImage()
            if (this.file != null) {
                this.deleteImage()
            }
            console.log(this.n_status)
            // const url = `http://localhost/php_G4/editNews.php`
            const url = `${import.meta.env.VITE_API_URL}/editNews.php`;
            let body = {
                n_no: this.n_no,
                n_img: this.n_img,
                n_link: this.n_link,
                n_article: this.n_article,
                n_status: this.n_status,
                n_time: this.n_time,
                n_topic: this.n_topic
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.responseData = json
                    if (
                        this.n_no != '' ||
                        this.n_topic != '' ||
                        this.n_img != '' ||
                        this.n_article != '' ||
                        this.n_link != '' ||
                        this.n_time != '' ||
                        this.n_status != ''
                    ) {
                        alert('修改成功!')
                        this.editSwitch = false
                        this.fetchData()
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        deleteNews(index) {
            if (this.deleteSwitch === false) {
                this.deleteSwitch = true
                this.n_no = this.responseData[index].n_no
                this.oldFileName =
                  `${import.meta.env.VITE_API_URL}/ ${this.responseData[index].n_img}`
            } else {
                this.deleteSwitch = false
                this.a_no = ''
                this.oldFileName = ''
            }
        },
        deleteConfirm() {
            const url = `${import.meta.env.VITE_API_URL}/deleteNews.php`;
            this.deleteImage();
            // let url = `http://localhost/php_G4/deleteNews.php`
            let body = {
                n_no: this.n_no
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.data = json
                    if (this.data != null || this.a_no != null) {
                        alert('刪除成功!')
                        this.deleteSwitch = false
                        this.fetchData()
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        getFile(event) {
                this.file = event.target.files[0]
            console.log(this.file)
            this.n_img = this.file.name
            console.log(this.n_img)
        },
        updateImage() {
            const url = `${import.meta.env.VITE_API_URL}/addNewsImage.php`;
            let formData = new FormData()
            formData.append('n_img', this.file)
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then((res) => res.json())
                .then((json) => {
                    this.responseData = json
                })
        },
        deleteImage() {
            const url = `${import.meta.env.VITE_API_URL}/deleteNewsImage.php`;
            let body = {
                oldFileName: this.oldFileName
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json)
                .then((json) => {
                    this.activities = json
                })
        },
        scrollToTop() {
            this.$refs.addLightBox.scrollTop = 0
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
            background-color: #fff;
            border-collapse: separate;
            border-spacing: 0;
            thead {
                text-align: center;
                font-weight: bold;
                border-collapse: separate;
                border-radius: 20px;
                background-color: $darkGreen;
                tr {
                    border-collapse: separate;
                    border-radius: 20px;
                    vertical-align: middle; /* 垂直居中對齊 */
                    th {
                        color: #fff;
                        font-family: Arial, sans-serif;
                        font-size: 13px;
                        padding: 10px;
                        border: solid 1px $darkGreen;
                    }
                }
            }
            tr {
                &:nth-child(even) {
                    background-color: #f8f8f8;
                }
                td {
                    font-size: 12px;
                    margin: 0 3px;
                    text-align: center;
                    border-bottom: solid 1px;
                    border: solid 0.1px #ddd;
                    vertical-align: middle; /* 垂直居中對齊 */
                    overflow: auto;
                    &::-webkit-scrollbar {
                        width: 1px;
                    }
                    a {
                        color: $darkGreen;
                        text-decoration: none;
                        cursor: pointer;
                    }
                }
            }
            /*第一欄第一列：左上*/
            tr:first-child th:first-child {
                // border-top-left-radius: 20px;
                width: 10%;
                padding: 10px;
            }
            tr:first-child th:nth-child(2) {
                width: 10%;
                padding: 10px;
            }
            tr:first-child th:nth-child(3) {
                width: 20%;
                padding: 10px;
            }
            tr:first-child th:nth-child(4) {
                width: 34%;
                padding: 10px;
            }
            tr:first-child th:nth-child(5) {
                width: 7%;
                padding: 10px;
            }
            tr:first-child th:nth-child(6) {
                width: 7%;
                padding: 10px;
            }
            tr:first-child th:last-child {
                width: 15%;
                padding: 10px;
            }
            /*第一欄最後列：左下*/
            tr:last-child td:first-child {
                border-bottom-left-radius: 20px;
                width: 10%;
            }
            /*最後欄第一列：右上*/
            tr:first-child th:last-child {
                // border-top-right-radius: 20px;
                width: 10%;
            }
            /*最後欄第一列：右下*/
            tr:last-child td:last-child {
                border-bottom-right-radius: 20px;
            }
            tr:first-child td:nth-child(5) {
                width: 5%;
                padding: 10px;
            }
            td:last-child {
                width: 10%;
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
            .delete {
                background-color: red;
            }
        }
    }
    .lightBoxWrapper {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: hsla(0, 0%, 0%, 0.7);
        z-index: 20;
        top: 0%;
        .lightBox {
            &::-webkit-scrollbar {
                width: 1px;
            }
            width: 60%;
            height: 90%;
            position: absolute;
            overflow: auto;
            background-color: $bcgw;
            border-radius: 10px;
            padding: 40px 50px;
            top: 50%;
            right: 50%;
            transform: translate(50%, -50%);
            z-index: 10;
            h2 {
                font-size: 2.25rem;
                color: $darkGreen;
                text-align: center;
                font-family: $titleFont;
                font-weight: bold;
                margin-bottom: 20px;
            }
            div {
                width: 100%;
                margin: 20px 0;
                display: flex;
                justify-content: space-between;
                span {
                    font-size: $fontBase;
                    color: $darkGreen;
                    justify-self: center;
                    align-self: center;
                }
                input {
                    width: 70%;
                    margin-left: 10%;
                    padding: 7px;
                    border: 1px solid #144433;
                    border-radius: 5px;
                    &:focus {
                        outline: 1px solid $lightGreen;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
                label{
                    width: 100%;
                    margin: 10px 0;
                input[type='file'] {
                    border: none;
                    height: 35px;
                    margin: 0;
                    padding: 0;
                    background-color: transparent;
                    color: #144433;
                    position: absolute;
                    opacity: 0;
                    &:focus {
                        outline: none;
                    }
                }
                .fakeBrowBTN {
                    background-color: $lightGreen;
                    color: #fff;
                    border: none;
                    padding: 5px;
                    border-radius: 5px;
                    margin-right: 5px;
                    margin-left: 18%;
                }
            }
                textarea {
                    margin-left: 20px;
                    padding: 10px;
                    box-sizing: border-box;
                    &::-webkit-scrollbar {
                        width: 1px;
                    }
                    &:focus {
                        outline: 1px solid $lightGreen;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
                select {
                    width: 70%;
                    margin-left: 10%;
                    border: solid 1px #ddd;
                    border-radius: 5px;
                    padding: 0 8px;
                    outline: none;
                    color: #000;
                    &:focus {
                        outline: 1px solid $lightGreen;
                        &::placeholder {
                            color: transparent;
                        }
                    }
                }
            }
            .button-field {
                width: 50%;
                display: flex;
                justify-content: center;
                gap: 10%;
                margin: 30px auto 10px auto;
                button {
                    display: inline-block;
                    text-decoration: none;
                    border-radius: 5px;
                    border: 1px solid #eee;
                    background-color: #144433;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    width: 40%;
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
    .delete-alert-field {
        .delete-alert {
            width: 35%;
            height: 35%;
            h2 {
                color: #cc3300;
            }
            .button {
                width: 100%;
                text-align: center;
                margin-top: 30px;
                padding: 0 10%;
                button {
                    display: inline-block;
                    text-decoration: none;
                    border-radius: 5px;
                    border: 1px solid #eee;
                    background-color: #144433;
                    color: #fff;
                    font-size: 1rem;
                    font-weight: bold;
                    width: 48%;
                    padding: 7px 20px;
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
