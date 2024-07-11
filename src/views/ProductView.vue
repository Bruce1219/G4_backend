<template>
    <section class="section">
        <div class="container">
            <div>
                <h1>商品管理</h1>
                <button @click="showAddModal">+ 新增商品</button>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">商品編號</th>
                            <th scope="col">商品名稱</th>
                            <th scope="col">商品類別</th>
                            <th scope="col">農場名稱</th>
                            <th scope="col">價格</th>
                            <th scope="col">購買單位</th>
                            <th scope="col">商品類別</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in sortedProducts" :key="product.p_no">
                            <td>{{ product.p_no }}</td>
                            <td>{{ product.p_name }}</td>
                            <td>{{ product.pc_name }}</td>
                            <td>{{ product.f_name }}</td>
                            <td>NT$ {{ product.p_fee }}</td>
                            <td>{{ product.p_unit }}</td>
                            <td>{{ product.p_popular == '0' ? '熱門商品' : '一般商品' }}</td>
                            <td>
                                <button @click="editProduct(product)" class="edit">編輯</button>
                                <button @click="deleteProduct(product.p_no)" class="delete">
                                    刪除
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div
            class="modal"
            v-if="showAddProductModal || showEditProductModal"
            @click="closeModalIfBackgroundClicked"
        >
            <div class="modal-content" @click.stop>
                <span class="close" @click="closeModal">&times;</span>
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="saveProduct">
                    <label v-if="showEditProductModal" for="productNo">商品編號</label>
                    <input
                        v-if="showEditProductModal"
                        type="text"
                        id="productNo"
                        v-model="currentProduct.p_no"
                        readonly
                    />

                    <label for="productName">商品名稱</label>
                    <input type="text" id="productName" v-model="currentProduct.p_name" required />

                    <label for="productCategory">商品類別</label>
                    <select id="productCategory" v-model="currentProduct.pc_no" required>
                        <option
                            v-for="category in uniqueCategories"
                            :key="category.pc_no"
                            :value="category.pc_no"
                        >
                            {{ category.pc_name }}
                        </option>
                    </select>

                    <label for="productFarm">農場名稱</label>
                    <select id="productFarm" v-model="currentProduct.f_no" required>
                        <option v-for="farm in uniqueFarms" :key="farm.f_no" :value="farm.f_no">
                            {{ farm.f_name }}
                        </option>
                    </select>

                    <label for="productFee">商品價格</label>
                    <input
                        type="number"
                        id="productFee"
                        v-model="currentProduct.p_fee"
                        required
                        min="0"
                    />

                    <label for="productUnit">購買單位</label>
                    <input type="text" id="productUnit" v-model="currentProduct.p_unit" required />

                    <label for="productPopular">商品熱門度</label>
                    <select id="productPopular" v-model="currentProduct.p_popular" required>
                        <option value="0">熱門商品</option>
                        <option value="1">一般商品</option>
                    </select>

                    <label for="productDescription">商品描述</label>
                    <textarea
                        id="productDescription"
                        v-model="currentProduct.p_info"
                        required
                    ></textarea>

                    <div v-for="(image, index) in currentProduct.pi_img" :key="index">
                        <label :for="'productImage' + (index + 1)">商品圖片 {{ index + 1 }}</label>
                        <input
                            type="file"
                            :id="'productImageFile' + (index + 1)"
                            @change="handleImageUpload($event, index)"
                            accept="image/*"
                        />
                    </div>

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
            products: [],
            farms: [],
            showAddProductModal: false,
            showEditProductModal: false,
            modalTitle: '',
            modalAction: '',
            currentProduct: this.getEmptyProduct()
        }
    },
    computed: {
        sortedProducts() {
            return [...this.products].sort((a, b) => {
                const aStr = typeof a.p_no === 'string' ? a.p_no : ''
                const bStr = typeof b.p_no === 'string' ? b.p_no : ''
                const aNumber = parseInt(aStr.replace(/\D/g, '') || '0', 10)
                const bNumber = parseInt(bStr.replace(/\D/g, '') || '0', 10)
                return aNumber - bNumber
            })
        },
        uniqueCategories() {
            const categories = this.products.map((product) => ({
                pc_no: product.pc_no,
                pc_name: product.pc_name
            }))
            return Array.from(new Map(categories.map((item) => [item.pc_no, item])).values())
        },
        uniqueFarms() {
            return this.farms
        }
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/product_api.php.php`)
                //const response = await fetch('http://localhost/php_g4/product_api.php')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                this.products = data.data.list.map((product) => ({
                    ...product,
                    p_no: product.p_no ? String(product.p_no) : ''
                }))
            } catch (error) {
                console.error('獲取商品列表時發生錯誤:', error)
                alert('獲取商品列表失敗,請稍後再試。')
            }
        },
        async fetchFarms() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/farm.php`)
                // const response = await fetch('http://localhost/php_g4/farm.php')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json()
                return data.data.list
            } catch (error) {
                console.error('獲取農場列表時發生錯誤:', error)
                alert('獲取農場列表失敗,請稍後再試。')
                return []
            }
        },
        getEmptyProduct() {
            return {
                p_no: '',
                p_name: '',
                pc_no: '',
                f_no: '',
                p_fee: 0,
                p_unit: '',
                p_info: '',
                pi_img: ['', '', '', ''],
                p_popular: '1'
            }
        },
        async editProduct(product) {
            this.currentProduct = {
                ...product,
                pi_img: product.pi_img.length ? product.pi_img : ['', '', '', ''],
                p_popular: product.p_popular || '1'
            }
            this.modalTitle = '編輯商品'
            this.modalAction = '更新'
            this.showEditProductModal = true
            this.farms = await this.fetchFarms()
        },
        async showAddModal() {
            this.currentProduct = this.getEmptyProduct()
            this.modalTitle = '新增商品'
            this.modalAction = '新增'
            this.showAddProductModal = true
            this.farms = await this.fetchFarms()
        },
        async saveProduct() {
            try {
                const uploadedImages = await this.uploadImages()

                const formData = new FormData()

                for (const key in this.currentProduct) {
                    if (key !== 'pi_img') {
                        if (key === 'p_fee') {
                            formData.append(key, Number(this.currentProduct[key]))
                        } else {
                            formData.append(key, this.currentProduct[key])
                        }
                    }
                }

                uploadedImages.forEach((img, index) => {
                    formData.append(`pi_img[${index}]`, img)
                })

                const isUpdate = !this.showAddProductModal
                formData.append('isUpdate', isUpdate ? '1' : '0')

                const url = `${import.meta.env.VITE_API_URL}/product_api.php`
                // const url = 'http://localhost/php_g4/product_api.php'
                if (isUpdate) {
                    formData.append('p_no', this.currentProduct.p_no)
                }

                const response = await fetch(url, {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData.msg || `HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                if (result.code === 200) {
                    await this.fetchProducts()
                    this.closeModal()
                    alert(result.msg || '操作成功')
                } else {
                    throw new Error(result.msg || '操作失敗')
                }
            } catch (error) {
                console.error('保存商品時發生錯誤:', error)
                alert('保存商品失敗,請稍後再試。錯誤詳情:' + error.message)
            }
        },
        async deleteProduct(productId) {
            if (confirm('確定要刪除此商品嗎?')) {
                try {
                    const response = await fetch(
                        // `http://localhost/php_g4/product_api.php?id=${productId}`,
                        `${import.meta.env.VITE_API_URL}/product_api.php.php?id=${productId}`,
                        { method: 'DELETE' }
                    )
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }
                    await this.fetchProducts()
                } catch (error) {
                    console.error('刪除商品時發生錯誤:', error)
                    alert('刪除商品失敗,請稍後再試。')
                }
            }
        },
        closeModal() {
            this.showAddProductModal = false
            this.showEditProductModal = false
            this.currentProduct = this.getEmptyProduct()
        },
        closeModalIfBackgroundClicked(event) {
            if (event.target.className === 'modal') {
                this.closeModal()
            }
        },
        async handleImageUpload(event, index) {
            const file = event.target.files[0]
            if (file) {
                try {
                    const formData = new FormData()
                    formData.append('pi_img', file)
                    // url='http://localhost/php_g4/productimg.php';
                    const url = ` ${import.meta.env.VITE_API_URL}/productimg.php`
                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    })

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`)
                    }

                    const result = await response.json()
                    if (result.code === 200) {
                        this.currentProduct.pi_img[index] = result.data.pi_img[0].fileName
                    } else {
                        throw new Error(result.msg || '上傳圖片失敗')
                    }
                } catch (error) {
                    console.error('上傳圖片時發生錯誤:', error)
                    alert('上傳圖片失敗,請稍後再試。錯誤詳情:' + error.message)
                }
            }
        },
        async uploadImages() {
            const uploadedImages = []
            for (let i = 0; i < this.currentProduct.pi_img.length; i++) {
                const img = this.currentProduct.pi_img[i]
                if (img instanceof File) {
                    const formData = new FormData()
                    formData.append('pi_img', img)
                    // url='http://localhost/php_g4/productimg.php';
                    const url = ` ${import.meta.env.VITE_API_URL}/productimg.php`
                    const response = await fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                    if (response.ok) {
                        const result = await response.json()
                        if (result.code === 200) {
                            uploadedImages[i] = result.data.pi_img[0].fileName
                        }
                    }
                } else if (typeof img === 'string' && img.trim() !== '') {
                    uploadedImages[i] = img
                }
            }
            return uploadedImages
        }
    },
    async mounted() {
        await this.fetchProducts()
        this.farms = await this.fetchFarms()
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
