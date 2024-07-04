<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>農場管理</h1>
                <button @click="showAddModal">+ 新增農場</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">農場編號</th>
                            <th scope="col">農場名稱</th>
                            <th scope="col">農場地區</th>
                            <th scope="col">農場小農姓名</th>
                            <th scope="col">農場簡介</th>
                            <th scope="col">狀態</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="farm in sortedFarms" :key="farm.f_no">
                            <td>{{ farm.f_no }}</td>
                            <td>{{ farm.f_name }}</td>
                            <td>{{ farm.f_loc }}</td>
                            <td>{{ farm.f_farmer }}</td>
                            <td>{{ farm.f_intro }}</td>
                            <td>{{ farm.f_status === '1' ? '上架' : '下架' }}</td>
                            <td>
                                <button @click="editFarm(farm)" class="edit">編輯</button>
                                <button @click="deleteFarm(farm.f_no)" class="delete">刪除</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div
            class="modal"
            v-if="showAddFarmModal || showEditFarmModal"
            @click="closeModalIfBackgroundClicked"
        >
            <div class="modal-content" @click.stop>
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="saveFarm">
                    <label for="farmNo">農場編號</label>
                    <input type="text" id="farmNo" v-model="currentFarm.f_no" required />

                    <label for="farmName">農場名稱</label>
                    <input type="text" id="farmName" v-model="currentFarm.f_name" required />

                    <label for="farmLocation">農場地區</label>
                    <input type="text" id="farmLocation" v-model="currentFarm.f_loc" required />

                    <label for="farmFarmer">農場小農姓名</label>
                    <input type="text" id="farmFarmer" v-model="currentFarm.f_farmer" required />

                    <label for="farmIntro">農場簡介</label>
                    <textarea id="farmIntro" v-model="currentFarm.f_intro" required></textarea>
                    <label for="farmImageFile">上傳農場圖片</label>
                    <input type="file" id="farmImageFile" @change="handleImageUpload" accept="image/*" />
                    <label for="farmImageName">農場圖片名稱</label>
                    <input
                        type="text"
                        id="farmImageName"
                        v-model="currentFarm.f_img"
                        placeholder="輸入圖片檔名"
                    />

                    <label for="farmStatus">農場狀態</label>
                    <select id="farmStatus" v-model="currentFarm.f_status" required>
                        <option value="1">上架</option>
                        <option value="0">下架</option>
                    </select>

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
            farms: [],
            showAddFarmModal: false,
            showEditFarmModal: false,
            modalTitle: '',
            modalAction: '',
            currentFarm: this.getEmptyFarm()
        }
    },
    computed: {
        sortedFarms() {
            return [...this.farms].sort((a, b) => a.f_no - b.f_no)
        }
    },
    methods: {
        async fetchFarms() {
            try {
                const response = await fetch('http://localhost/php_g4/farm.php')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                this.farms = data.data.list
            } catch (error) {
                console.error('獲取農場列表時發生錯誤:', error)
                alert('獲取農場列表失敗,請稍後再試。')
            }
        },
        getEmptyFarm() {
            return {
                f_no: '',
                f_name: '',
                f_loc: '',
                f_farmer: '',
                f_intro: '',
                f_img: '',
                f_status: '1'
            }
        },
        editFarm(farm) {
            this.currentFarm = { ...farm }
            this.modalTitle = '編輯農場'
            this.modalAction = '更新'
            this.showEditFarmModal = true
        },
        showAddModal() {
            this.currentFarm = this.getEmptyFarm()
            this.modalTitle = '新增農場'
            this.modalAction = '新增'
            this.showAddFarmModal = true
        },
        async saveFarm() {
            try {
                console.log('Saving farm data:', this.currentFarm)

                const method = this.showAddFarmModal ? 'POST' : 'PUT'
                const url = this.showAddFarmModal
                    ? 'http://localhost/php_g4/farm.php'
                    : `http://localhost/php_g4/farm.php?id=${this.currentFarm.f_no}`

                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentFarm)
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.msg || `HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                console.log('Server response:', result)

                if (result.code === 200) {
                    await this.fetchFarms()
                    this.closeModal()
                    alert(result.msg || '操作成功')
                } else {
                    throw new Error(result.msg || '操作失敗')
                }
            } catch (error) {
                console.error('保存農場時發生錯誤:', error)
                alert('保存農場失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        },
        async deleteFarm(farmNo) {
            try {
                const response = await fetch(`http://localhost/php_g4/farm.php?id=${farmNo}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.msg || `HTTP error! status: ${response.status}`)
                }
                const result = await response.json()
                if (result.code === 200) {
                    await this.fetchFarms()
                    alert(result.msg || '刪除成功')
                } else {
                    throw new Error(result.msg || '刪除失敗')
                }
            } catch (error) {
                console.error('刪除農場時發生錯誤:', error)
                alert('刪除農場失敗，請稍後再試。錯誤詳情：' + error.message)
            }
        },
        closeModal() {
            this.showAddFarmModal = false
            this.showEditFarmModal = false
            this.currentFarm = this.getEmptyFarm()
        },
        closeModalIfBackgroundClicked(event) {
            if (event.target.className === 'modal') {
                this.closeModal()
            }
        }
    },
    mounted() {
        this.fetchFarms()
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
        margin-left: 250px;

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

                            .edit, .delete {
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

