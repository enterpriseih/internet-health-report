<template>
    <div>
        <div id="IHR_contact-page">
            <div class="Subscribe">
                <h6>ressources</h6>
                <p v-if="tags.length == 0" class="IHR_description">Your resources</p>
                <div v-else class="tag">
                    <el-tag v-for="(item, index) in tags" :key="index" type="warning" style="margin: 5px 8px"
                        @close="handleClose(item)" :closable="flag">
                        {{ item.channel.split(' ')[0] }}
                    </el-tag>
                </div>
                <q-btn v-if="flag" class="subbnt" color="orange-5" label="subscribe" @click="subscribe()" no-caps />
                <div v-else class="group">
                    <q-btn outline color="orange-5" label="edit" @click="edit()" no-caps />
                    <q-btn color="orange-5" label="setting" @click="toSetting()" no-caps />
                </div>
            </div>
            <div class="select">
                <q-btn-toggle v-model="panel" rounded @click="changePanel(panel)" toggle-color="blue" no-caps :options="[
                    { label: 'counties', value: 'country' },
                    { label: 'cities', value: 'city' },
                    { label: 'networks', value: 'network' },
                ]" />
                <q-input v-model="word" outlined style="width: 40%; margin: 30px 0 20px 0" placeholder="search resource"
                    @keyup.enter="searchChange(word)">
                    <template v-slot:append>
                        <q-icon name="search" @click="searchChange(word)" color="blue" style="cursor: pointer" />
                    </template>
                </q-input>
                <q-tab-panels v-model="panel" animated style="border-top: 1px solid #ccc">
                    <q-tab-panel name="country">
                        <div class="btn_list">
                            <q-btn outline v-for="(item, index) in dataList" :key="index" color="white"
                                text-color="black" :label="item.split(' ')[0]" @click="select(item)" no-caps>
                                <q-tooltip class="bg-accent">{{ item }}</q-tooltip>
                            </q-btn>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="city">
                        <div class="btn_list">
                            <q-btn outline v-for="(item, index) in dataList" :key="index" color="white"
                                text-color="black" :label="item.split(' ')[0]" @click="select(item)" no-caps>
                                <q-tooltip class="bg-accent">{{ item }}</q-tooltip>
                            </q-btn>
                        </div>
                    </q-tab-panel>

                    <q-tab-panel name="network">
                        <div class="btn_list">
                            <q-btn outline v-for="(item, index) in dataList" :key="index" color="white"
                                text-color="black" :label="item.split(' ')[0]" @click="select(item)" no-caps>
                                <q-tooltip class="bg-accent">{{ item }}</q-tooltip>
                            </q-btn>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </div>
            <q-dialog v-model="alert">
                <q-card style="width: 300px">
                    <q-card-section>
                        <div class="text-h6">Alert</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none"> Waiting to be developed </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
        <div class="IHR_background" :style="{
            backgroundImage: 'url(' + require('@/assets/imgs/ihr_logo.svg') + ')',
        }"></div>
    </div>
</template>
<script>
export default {
    name: 'SelectPage',
    components: {},
    data() {
        return {
            tags: [],
            panel: 'country',
            word: '',
            flag: true,
            alert: false,
            dataList: [],
        }
    },
    mounted() {
        this.getChannel(this.panel, this.word)
    },
    methods: {
        getChannel(type, content) {
            this.$ihr_api.searchChannel(type, content,
                res => {
                    console.log(res)
                    this.dataList = res.data
                },
                error => {
                    console.log(error)
                });
        },
        select(label) {
            if (this.flag) {
                this.tags.push({ channel: label, frequency: 'normal' })
            }
            this.alert = true
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1)
        },
        searchChange(val) {
            this.getChannel(this.panel, val)
        },
        changePanel(val) {
            this.word = ''
            this.getChannel(val, this.word)

        },
        subscribe() {
            this.flag = false
        },
        edit() {
            this.flag = true
        },
        toSetting() {
            let routeUrl = this.$router.resolve({
                path: '/en-us/setting',
                query: { data: JSON.stringify(this.tags) },
            })
            window.open(routeUrl.href, '_blank')
        },
    },
}
</script>

<style>
#IHR_contact-page {
    width: 60%;
    margin: 0 auto;
}

.IHR_background {
    width: 1000px;
    height: 1000px;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 1000px 1000px;
    opacity: 0.1;
    position: absolute;
    left: 60%;
    top: 450px;
    overflow-x: hidden;
    position: fixed;
    pointer-events: none;
}

.Subscribe {
    position: relative;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
}

.IHR_description {
    font-size: 20px;
    color: #d6d6d6;
}

.subbnt {
    position: absolute;
    height: 38px;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}

.group {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    position: absolute;
    height: 100px;
    width: 100px;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}

.group .q-btn {
    width: 100px;
    height: 38px;
}

.select {
    margin-top: 20px;
}

.select .q-btn {
    width: 102px;
}

.select .q-field__control {
    height: 40px;
}

.select .q-field__label {
    line-height: 10px;
}

.select .q-field__marginal {
    height: 40px;
}

.btn_list {
    height: 150px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
}

.btn_list .q-btn {
    margin: 10px 5px;
    overflow: hidden;
}

.tag {
    display: flex;
    justify-content: flex-start;
    align-content: space-between;
    flex-wrap: wrap;
    width: 80%;
    min-height: 46px;
}

.el-tag {
    /* width: 100px!important; */
    text-align: center !important;
    height: 36px !important;
    line-height: 36px !important;
    font-size: 16px !important;
}
</style>
