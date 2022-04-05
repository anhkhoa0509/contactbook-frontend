<template>
  <form>
    <h1>Thêm liên hệ</h1>
    <div class="form-group">
      <label for="exampleFormControlInput1">Tên</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Nguyễn Lê Anh Khoa"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Email</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="khoab1906499@student.ctu.edu.vn"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Địa chỉ</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="Cần Thơ"
      />
    </div>
    <div class="form-group">
      <label for="exampleFormControlInput1">Số điện thoại</label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="0794231837"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="defaultCheck1"
      />
      <label class="form-check-label" for="defaultCheck1">
        <b> Liên hệ yêu thích</b>
      </label>
    </div>
    <button type="submit" class="btn btn-primary mr-3">Lưu</button>
    <button type="submit" class="btn btn-danger">Hủy</button>
  </form>
</template>

<script>
import ContactCard from "../components/ContactCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  // Đoạn mã xử lý đầy đủ sẽ trình bày bên dưới
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    //  Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((contact, index) =>
        this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.contacts[this.activeIndex];
    },
    contactCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddContact() {
      this.$router.push({ name: "AddContact" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
