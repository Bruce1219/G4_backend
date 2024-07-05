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
                        <tr v-for="(item, index) in activities" :key="item.a_no">
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
                            <td>{{ item.a_start_date }}</td>
                            <td v-show = "item.a_status ==1">上架</td>
                            <td v-show = "item.a_status == 0">下架</td>
                            <td>
                                <button class="edit" @click="editEvent($event, index)">編輯</button>
                                <button class="edit delete" @click="deleteEvent($event,index)">
                                    刪除
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    <div
        class="section-addActivity"
        v-show="addSwitch === true || editSwitch === true"
    >
        <div class="addActivity" @click.stop>
            <h2 v-show="addSwitch">新增活動</h2>
            <h2 v-show="editSwitch">修改活動</h2>
            <form action="#">
                <div>
                    <span>活動編號 : </span>
                    <input type="number" name="a_no" v-model="a_no" disabled/>
                </div>
                <div>
                    <span>活動類別 : </span>
                    <select name="c_no" id="" v-model="c_no">
                        <option value="市集">市集</option>
                        <option value="講座">講座</option>
                    </select>
                </div>
                <div>
                    <span>新增圖片 : </span> 
                    <input type="file" name="a_img" id="addImg" placeholder="上傳圖片" @change="getfile($event)"/>
                </div>
                <div>
                    <span>活動名稱 : </span>
                    <input type="text" name="a_name" placeholder="輸入活動名稱" v-model="a_name" />
                </div>
                <div>
                    <span>活動地址 : </span>
                    <input type="text" name="a_loc" placeholder="活動地址" v-model="a_loc" />
                </div>
                <div>
                    <span>報名上限 : </span>
                    <input type="number" name="a_max" v-model="a_max" />
                </div>
                <div>
                    <span>活動費用 : </span>
                    <input type="number" name="a_fee" v-model="a_fee" />
                </div>
                <div>
                    <span>活動日期: </span>
                    <input type="datetime-local" name="a_time" v-model="a_time" />
                </div>
                <div>
                    <span>活動區間: </span>
                    <input type="date" name="a_start_date" v-model="a_start_date" />
                    <input type="date" name="a_end_date" v-model="a_end_date" />
                </div>
                <div>
                    <span>講師: </span>
                    <input type="text" name="a_teacher" v-model="a_teacher" />
                </div>
                <div>
                    <span>報名區間: </span>
                    <input type="date" name="a_signups" v-model="a_signups" />
                    <input type="date" name="a_signupe" v-model="a_signupe" />
                </div>
                <div>
                    <span>活動資訊: </span>
                    <textarea name="a_info" v-model="a_info"></textarea>
                </div>
                <div>
                    <span>活動資訊1: </span>
                    <textarea name="a_info1" v-model="a_info1"></textarea>
                </div>
                <div>
                    <span>活動資訊2: </span>
                    <textarea name="a_info2" v-model="a_info2"></textarea>
                </div>
                <div>
                    <span>活動資訊3: </span>
                    <textarea name="a_info3" v-model="a_info3"></textarea>
                </div>
                <div>
                    <span>活動須知1: </span>
                    <textarea name="a_rules1" v-model="a_rules1"></textarea>
                </div>
                <div>
                    <span>活動須知2: </span>
                    <textarea name="a_rules2" v-model="a_rules2"></textarea>
                </div>
                <div>
                    <span>活動須知3: </span>
                    <textarea name="a_rules3" v-model="a_rules3"></textarea>
                </div>
                <div>
                    <span>活動狀態:</span>
                    <select name="a_status" v-model="a_status">
                        <option value="1">上架</option>
                        <option value="0">下架</option>
                    </select>
                </div>
                <div class="button" v-show="addSwitch">
                    <button type="button" class="cancel" @click="addActivity($event)">取消</button>
                    <button type="button" class="confirm" @click="confirm()">儲存</button>
                </div>
                <div class="button" v-show="editSwitch">
                    <button type="button" class="cancel" @click="editEvent($event)">取消</button>
                    <button type="button" class="confirm" @click="editConfirm()">儲存</button>
                </div>
            </form>
        </div>
    </div>
    <div class="section-addActivity" v-show="deleteSwitch === true" @click="deleteEvent($event)"  >
        <div class="delete-alert addActivity"  @click.stop>
            <h2>確定要刪除?</h2>
            <div class="button">
            <button type="button" class=" cancel" @click="deleteEvent($event)">取消</button>
            <button class=" delete confirm" @click="deleteConfirm()">刪除</button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addSwitch: false,
            editSwitch: false,
            deleteSwitch: false,
            activities: [],
            // data: {},
            a_no: '',
            c_no: '',
            a_img: null,
            a_name: '',
            a_loc: '',
            a_max: '',
            a_fee: '',
            a_time: '',
            a_start_date: '',
            a_end_date: '',
            a_teacher: '',
            a_signups: '',
            a_signupe: '',
            a_info: '',
            a_info1: '',
            a_info2: '',
            a_info3: '',
            a_rules1: '',
            a_rules2: '',
            a_rules3: '',
            a_status: '',
            file:null,
        }
    },
    methods: {
        parsePic(file) {
            return new URL(`../assets/image/${file}`, import.meta.url).href
        },
        addActivity(event) {
            event.stopPropagation() // 阻止事件冒泡
            //新增情況
            if (this.addSwitch === false) {
                this.addSwitch = true;
                this.a_no = this.activities.length+1
            } else {
                this.addSwitch = false
                this.a_no = this.activities.length+1
                this.c_no = ''
                this.a_img = null
                this.a_name = ''
                this.a_loc = ''
                this.a_max = ''
                this.a_fee = ''
                this.a_time = ''
                this.a_start_date = ''
                this.a_end_date = ''
                this.a_teacher = ''
                this.a_signups = ''
                this.a_signupe = ''
                this.a_info = ''
                this.a_info1 = ''
                this.a_info2 = ''
                this.a_info3 = ''
                this.a_rules1 = ''
                this.a_rules2 = ''
                this.a_rules3 = ''
                this.a_status = ''
            }
        },
        confirm() {
            // let formData = new FormData();
            // formData.append("a",this.file)
            // let fileData =  JSON.stringify(formData);
            // console.log(typeof data);
            this.fetchImage();
            const url = `http://localhost/php_G4/addEvents.php`
            let body = {
                a_no: this.a_no,
                c_no: this.c_no,
                a_img: this.file.name,
                a_name: this.a_name,
                a_loc: this.a_loc,
                a_max: this.a_max,
                a_fee: this.a_fee,
                a_time: this.a_time,
                a_start_date: this.a_start_date,
                a_end_date: this.a_end_date,
                a_teacher: this.a_teacher,
                a_signups: this.a_signups,
                a_signupe: this.a_signupe,
                a_info: this.a_info,
                a_info1: this.a_info1,
                a_info2: this.a_info2,
                a_info3: this.a_info3,
                a_rules1: this.a_rules1,
                a_rules2: this.a_rules2,
                a_rules3: this.a_rules3,
                a_status: this.a_status,
            }
            fetch(url, {
                method: 'POST',
                // body:fileData,
                body:JSON.stringify(body),
                headers:{'content-type':'multipart/form-data"'}
            })
                .then((res) => res.json())
                .then((json) => {
                    // 檢查是否有 this.data
                    this.activities = json
                    console.log('TEST: ' + this.activities)
                    if (
                        this.data != null ||
                        this.a_no != null ||
                        this.c_no != null ||
                        this.a_name != null ||
                        this.a_loc != null ||
                        this.a_max != null ||
                        this.a_fee != null ||
                        this.this.a_time ||
                        this.a_start_date != null ||
                        this.a_end_date != null ||
                        this.a_signups != null ||
                        this.this.a_signupe != null ||
                        this.a_status != null
                    ) {
                        alert('新增成功!')
                        this.addSwitch = false
                        this.fetchDate()
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },fetchImage () {
            let formData = new FormData();
            formData.append("a_img",this.file)
            // let fileData =  JSON.stringify(formData);
            fetch(`http://localhost/php_G4/addEventImage.php`,{
                method:'POST',
                body:formData,
            })
            .then((res) =>res.json)
            .then((json)=>{
                this.activities = json;
            })

        },
        getfile(event) {
            this.file = event.target.files[0]
            this.a_img = this.file.name
            console.log(this.a_img)
            console.log(this.file)
            console.log(typeof this.file)
        },
        editEvent(event,index) {
            event.stopPropagation()
            if (this.editSwitch === false) {
                this.editSwitch = true
                //編輯把值帶入input裡面
                this.a_no = this.activities[index].a_no
                this.c_no = this.activities[index].c_no
                this.a_name = this.activities[index].a_name
                this.a_loc = this.activities[index].a_loc
                this.a_max = this.activities[index].a_max
                this.a_fee = this.activities[index].a_fee
                this.a_time = this.activities[index].a_time
                this.a_start_date = this.activities[index].a_start_date
                this.a_end_date = this.activities[index].a_end_date
                this.a_teacher = this.activities[index].a_teacher
                this.a_signups = this.activities[index].a_signups
                this.a_signupe = this.activities[index].a_signupe
                this.a_info = this.activities[index].a_info
                this.a_info1 = this.activities[index].a_info1
                this.a_info2 = this.activities[index].a_info2
                this.a_info3 = this.activities[index].a_info3
                this.a_rules1 = this.activities[index].a_rules1
                this.a_rules2 = this.activities[index].a_rules2
                this.a_rules3 = this.activities[index].a_rules3
                this.a_status = this.activities[index].a_status
            } else {
                //關閉時，重置
                this.editSwitch = false
                this.a_no = this.activities.length+1
                this.c_no = ''
                this.a_img = null
                this.a_name = ''
                this.a_loc = ''
                this.a_max = ''
                this.a_fee = ''
                this.a_time = ''
                this.a_start_date = ''
                this.a_end_date = ''
                this.a_teacher = ''
                this.a_signups = ''
                this.a_signupe = ''
                this.a_info = ''
                this.a_info1 = ''
                this.a_info2 = ''
                this.a_info3 = ''
                this.a_rules1 = ''
                this.a_rules2 = ''
                this.a_rules3 = ''
                this.a_status = ''
            }
        },
        fetchDate() {
            fetch(`http://localhost/php_G4/activitiesList.php`, {
                method: 'POST'
                
            })
                .then((res) => res.json())
                .then((json) => {
                    console.log(json)
                    this.activities = json['data']['list']
                })
        },
        editConfirm() {
            const url = `http://localhost/php_G4/editEvents.php`
            let body = {
                a_no: this.a_no,
                c_no: this.c_no,
                a_img: this.a_img,
                a_name: this.a_name,
                a_loc: this.a_loc,
                a_max: this.a_max,
                a_fee: this.a_fee,
                a_time: this.a_time,
                a_start_date: this.a_start_date,
                a_end_date: this.a_end_date,
                a_teacher: this.a_teacher,
                a_signups: this.a_signups,
                a_signupe: this.a_signupe,
                a_info: this.a_info,
                a_info1: this.a_info1,
                a_info2: this.a_info2,
                a_info3: this.a_info3,
                a_rules1: this.a_rules1,
                a_rules2: this.a_rules2,
                a_rules3: this.a_rules3,
                a_status: this.a_status
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.data = json
                    
                    if (
                        this.data != null ||
                        this.a_no != null ||
                        this.c_no != null ||
                        this.a_name != null ||
                        this.a_loc != null ||
                        this.a_max != null ||
                        this.a_fee != null ||
                        this.this.a_time ||
                        this.a_start_date != null ||
                        this.a_end_date != null ||
                        this.a_signups != null ||
                        this.this.a_signupe != null ||
                        this.a_status != null
                    ) {
                        alert('編輯成功!')
                        this.editSwitch = false
                        this.fetchDate()
                    } else {
                        alert(this.data.msg)
                    }

                    console.log(this.data)
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        },
        deleteEvent(event,index) {
            event.stopPropagation();
            console.log(this.deleteSwitch)
            if (this.deleteSwitch === false) {
                this.deleteSwitch = true
                //編輯把值帶入input裡面
                this.a_no = this.activities[index].a_no
            } else {
                //關閉時，重置
                this.deleteSwitch = false
                this.a_no = ''
            }
        },
        deleteConfirm () {
            const url = `http://localhost/php_G4/deleteEvents.php`
            let body = {
                a_no: this.a_no,
            }
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body)
            })
                .then((res) => res.json())
                .then((json) => {
                    this.data = json
                    console.log(this.data)
                    if (
                        this.data != null ||
                        this.a_no != null 
                    ) {
                        alert('刪除成功!')
                        this.deleteSwitch = false
                        this.fetchDate()
                    } else {
                        alert(this.data.msg)
                    }
                })
                .catch((error) => {
                    console.error('Error:', error)
                })
        }
    },
    mounted() {
        this.fetchDate()
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
            &::-webkit-scrollbar {
                width: 1px;
            }
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
        &::-webkit-scrollbar {
            width: 1px;
        }
        overflow: auto;
        width: 80%;
        height: 80%;
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
