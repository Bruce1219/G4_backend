<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>食農問答管理</h1>
                <button @click="showAddModal">+ 新增題目</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">題目編號</th>
                            <th scope="col">題目</th>
                            <th scope="col">正確答案</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="question in questions" :key="question.no">
                            <td>{{ question.no }}</td>
                            <td>{{ question.question }}</td>
                            <td>{{ question.correctAnswer }}</td>
                            <td>
                                <button @click="editQuestion(question)" class="edit">編輯</button>
                                <button @click="deleteQuestion(question.no)" class="delete">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal" v-if="showAddQuestionModal || showEditQuestionModal" @click="closeModalIfBackgroundClicked">
            <div class="modal-content" @click.stop>
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="saveQuestion">
                    <label for="questionNo">問題題號</label>
                    <input type="text" id="questionNo" v-model="currentQuestion.no" required :disabled="showEditQuestionModal" />

                    <label for="question">問題題目</label>
                    <input type="text" id="question" v-model="currentQuestion.question" required />

                    <label for="answer">正確答案選項</label>
                    <select id="answer" v-model="currentQuestion.answer" required>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                    <label for="correctAnswer">正確答案文字</label>
                    <input type="text" id="correctAnswer" v-model="currentQuestion.correctAnswer" required />

                    <label for="explanation">解答解釋</label>
                    <textarea id="explanation" v-model="currentQuestion.explanation" required></textarea>

                    <label for="answer_image">解答圖片</label>
                    <input type="file" id="answer_image" @change="handleImageUpload($event, 'answer')" />
                    
                    <template v-for="option in currentQuestion.options" :key="option.key">
                        <label :for="'option_' + option.key">{{ option.key }}選項內容</label>
                        <input :id="'option_' + option.key" v-model="option.text" required />

                        <label :for="'option_' + option.key + '_image'">{{ option.key }}選項圖片</label>
                        <input type="file" :id="'option_' + option.key + '_image'" @change="handleImageUpload($event, option.key)" />
                    </template>

                    <button type="submit">{{ modalAction }}</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            questions: [],
            showAddQuestionModal: false,
            showEditQuestionModal: false,
            modalTitle: '',
            modalAction: '',
            currentQuestion: null,
            uploadQueue: [],
            isUploading: false,
            pendingUploads: 0
        }
    },
    methods: {
        async fetchQuestions() {
            try {
                const url = `${import.meta.env.VITE_API_URL}/get_question.php`;
                //const url = 'http://localhost/php_g4/get_question.php';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ action: 'getQuestions' })
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log('API Response:', data)

                if (data.code === 200 && Array.isArray(data.data.list)) {
                    this.questions = data.data.list.map((question) => ({
                        ...question,
                        options: Array.isArray(question.options)
                            ? question.options.map((option) => ({
                                  key: option.key || option.q_options,
                                  text: option.text || option.q_answer,
                                  img: option.img || option.q_img
                              }))
                            : []
                    }))
                    console.log('Processed questions:', this.questions)
                } else {
                    throw new Error(data.msg || 'Unexpected data format received from the server')
                }
            } catch (error) {
                console.error('獲取問題列表時發生錯誤:', error)
                alert('獲取問題列表失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        },
        getEmptyQuestion() {
            return {
                no: '',
                question: '',
                options: [
                    { key: 'A', img: '', text: '' },
                    { key: 'B', img: '', text: '' },
                    { key: 'C', img: '', text: '' },
                    { key: 'D', img: '', text: '' }
                ],
                answer: '',
                correctAnswer: '',
                answer_image: '',
                explanation: ''
            }
        },
        editQuestion(question) {
            this.currentQuestion = JSON.parse(JSON.stringify(question))
            this.modalTitle = '編輯題目'
            this.modalAction = '更新'
            this.showEditQuestionModal = true
        },
        showAddModal() {
            this.currentQuestion = this.getEmptyQuestion()
            this.modalTitle = '新增題目'
            this.modalAction = '新增'
            this.showAddQuestionModal = true
        },
        async saveQuestion() {
            if (this.uploadQueue.length > 0) {
                this.pendingUploads = this.uploadQueue.length;
                this.processUploadQueue();
            }
            
            await this.waitForUploads();
            
            try {
                const url = `${import.meta.env.VITE_API_URL}/get_question.php`
                //const url = 'http://localhost/php_g4/get_question.php';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'saveQuestion',
                        question: this.currentQuestion
                    })
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()

                if (data.code === 200) {
                    await this.fetchQuestions()
                    this.closeModal()
                    alert(data.msg || '保存成功')
                } else {
                    throw new Error(data.msg || '保存失敗')
                }
            } catch (error) {
                console.error('保存問題時發生錯誤:', error)
                alert('保存失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        },
        async deleteQuestion(questionNo) {
            if (confirm('確定要刪除這個問題嗎？此操作不可撤銷。')) {
                try {
                    const url = `${import.meta.env.VITE_API_URL}/get_question.php`
                    //const url = 'http://localhost/php_g4/get_question.php';
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            action: 'deleteQuestion',
                            questionNo: questionNo
                        })
                    })

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }

                    const data = await response.json()

                    if (data.code === 200) {
                        await this.fetchQuestions()
                        alert(data.msg || '刪除成功')
                    } else {
                        throw new Error(data.msg || '刪除失敗')
                    }
                } catch (error) {
                    console.error('刪除問題時發生錯誤:', error)
                    alert('刪除失敗，請稍後再試。錯誤詳情：' + error.message)
                }
            }
        },
        closeModal() {
            this.showAddQuestionModal = false
            this.showEditQuestionModal = false
            this.modalTitle = ''
            this.modalAction = ''
            this.currentQuestion = this.getEmptyQuestion()
            this.uploadQueue = []
            this.isUploading = false
            this.pendingUploads = 0
        },
        closeModalIfBackgroundClicked(event) {
            if (event.target.className === 'modal') {
                this.closeModal()
            }
        },
        async waitForUploads() {
            return new Promise((resolve) => {
                const checkUploads = () => {
                    if (this.pendingUploads === 0) {
                        resolve();
                    } else {
                        setTimeout(checkUploads, 100);
                    }
                };
                checkUploads();
            });
        },
        handleImageUpload(event, type) {
            const file = event.target.files[0]
            if (file) {
                this.uploadQueue.push({ file, type })
                if (!this.isUploading) {
                    this.processUploadQueue()
                }
            }
        },
        async processUploadQueue() {
            if (this.isUploading || this.uploadQueue.length === 0) {
                return
            }

            this.isUploading = true
            const { file, type } = this.uploadQueue.shift()

            let formData = new FormData()
            formData.append(type === 'answer' ? 'q_explainimg_img' : 'q_img', file)

            try {
                const url = `${import.meta.env.VITE_API_URL}/questionsimg.php`;
                //const url = 'http://localhost/php_g4/questionsimg.php';
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                console.log('Server response:', result)

                if (result.code === 200) {
                    const uploadedFileName =
                        type === 'answer'
                            ? result.data.q_explainimg_img.fileName
                            : result.data.q_img.fileName
                    if (type === 'answer') {
                        this.currentQuestion.answer_image = uploadedFileName
                    } else {
                        const option = this.currentQuestion.options.find((opt) => opt.key === type)
                        if (option) {
                            option.img = uploadedFileName
                        }
                    }
                    console.log(`圖片上傳成功: ${uploadedFileName}`)
                } else {
                    throw new Error(result.msg || '圖片上傳失敗')
                }
            } catch (error) {
                console.error('圖片上傳錯誤:', error)
                alert(`圖片 ${file.name} 上傳失敗，請稍後再試。錯誤詳情：${error.message}`)
            } finally {
                this.isUploading = false
                this.pendingUploads--;
                if (this.uploadQueue.length > 0) {
                    this.processUploadQueue()
                }
            }
        }
    },
    mounted() {
        this.fetchQuestions()
    }
}
</script>

<style lang="scss" scoped>
$fontBase: 16px;
$lineheight: 1.5;
$letterSpacing: 0.05em;
$pFont: Arial, sans-serif;
$titleFont: 'Noto Sans TC', sans-serif;
$darkGreen: #144433;
$red: #ff4444;

.section {
    font-size: $fontBase;
    line-height: $lineheight;
    letter-spacing: $letterSpacing;
    font-family: $pFont;
    cursor: default;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .container {
        width: 80%;
        padding: 30px;
        display: flex;
        flex-direction: column;
        height: calc(100vh - 60px);
        margin-left: 20%;

        > div:first-child {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;

            h1 {
                font-size: 2.25em;
                font-family: $titleFont;
                font-weight: bold;
                margin: 0;
            }

            button {
                color: #fff;
                text-decoration: none;
                background-color: $darkGreen;
                border: solid 1px transparent;
                padding: 10px 20px;
                border-radius: 5px;
                transition: 0.3s;
                cursor: pointer;

                &:hover {
                    background-color: #fff;
                    border: solid 1px $darkGreen;
                    color: $darkGreen;
                }
            }
        }

        .table-container {
            flex-grow: 1;
            overflow-y: auto;
            margin-bottom: 20px;

            table {
                width: 100%;
                background-color: #fff;
                border-collapse: separate;
                border-spacing: 0;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

                thead {
                    background-color: $darkGreen;
                    color: #fff;
                    position: sticky;
                    top: 0;
                    z-index: 1;

                    th {
                        padding: 15px;
                        text-align: left;
                        font-weight: bold;
                    }
                }

                tbody {
                    tr {
                        &:nth-child(even) {
                            background-color: #f8f8f8;
                        }

                        td {
                            padding: 15px;
                            border-bottom: 1px solid #ddd;

                            &:last-child {
                                text-align: center;
                            }

                            .edit,
                            .delete {
                                color: #fff;
                                border: none;
                                padding: 5px 10px;
                                border-radius: 3px;
                                cursor: pointer;
                                transition: 0.3s;
                                margin: 0 2px;
                            }

                            .edit {
                                background-color: $darkGreen;

                                &:hover {
                                    background-color: darken($darkGreen, 10%);
                                }
                            }

                            .delete {
                                background-color: $red;

                                &:hover {
                                    background-color: darken($red, 10%);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.modal {
    display: flex;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    align-items: center;
    justify-content: center;

    .modal-content {
        background-color: #fefefe;
        padding: 20px;
        border-radius: 10px;
        width: 80%;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;

        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;

            &:hover,
            &:focus {
                color: #000;
                text-decoration: none;
                cursor: pointer;
            }
        }

        h2 {
            margin-top: 0;
            color: $darkGreen;
        }

        form {
            display: flex;
            flex-direction: column;
            gap: 15px;

            label {
                font-weight: bold;
                color: $darkGreen;
                margin-top: 10px;
            }

            input,
            select,
            textarea {
                width: 100%;
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #ccc;
                font-size: 14px;

                &:focus {
                    outline: none;
                    border-color: $darkGreen;
                }
            }

            textarea {
                height: 100px;
                resize: vertical;
            }

            .option-group {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                align-items: center;

                input[type='file'] {
                    grid-column: span 2;
                }
            }

            button[type='submit'] {
                padding: 10px;
                background-color: $darkGreen;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                transition: 0.3s;
                margin-top: 20px;

                &:hover {
                    background-color: darken($darkGreen, 10%);
                }
            }
        }
    }
}

.preview-image {
    max-width: 100px;
    max-height: 100px;
    object-fit: contain;
    margin-top: 5px;
}
</style>
