import { create } from "zustand";
import {
  createBlog,
  getAllUsers,
  getBlogs,
  userRegister,
  getBlog,
  updateBlog,
  deleteBlog,
  forgetPassword,
  resetPassword as resetPasswordAPI,
  updateRegister,
  getUser,
} from "./api";
import { blogStore, userStore } from "./types";

export const useUserStore = create<userStore>((set) => ({
  users: [],
  apiError: null,
  createUser: async (newUser: UserRegisterType) => {
    try {
      const createdUser = await userRegister(newUser);
      set((state) => ({
        users: [...state.users, createdUser],
        apiError: null,
      }));
    } catch (error: any) {
      const errorObj: { [key: string]: string } = {};

      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(
          (err: { field: string; message: string }) => {
            errorObj[err.field] = err.message;
          }
        );
      } else if (error.response?.data?.error) {
        errorObj.general = error.response.data.error;
      } else {
        errorObj.general = "An unexpected error occurred";
      }

      set({ apiError: errorObj });
    }
  },
  loadUser: async () => {
    const users = await getAllUsers();
    set({ users });
  },

  getUser: async (id: string) => {
    try {
      await getUser(id);
      set({ apiError: null });
    } catch (error: any) {
      const errorObj = {
        general: error.response?.data?.error || "An unexpected error occurred",
      };
      set({ apiError: errorObj });
    }
  },

  forgetPassword: async (emailData: ForgotPasswordTypes) => {
    try {
      await forgetPassword(emailData);
      set({ apiError: null });
    } catch (error: any) {
      const errorObj = {
        general: error.response?.data?.error || "An unexpected error occurred",
      };
      set({ apiError: errorObj });
    }
  },

  resetPassword: async ({
    token,
    password,
    confirmPassword,
  }: resetPasswordTypes) => {
    try {
      await resetPasswordAPI({ token, password, confirmPassword });
      set({ apiError: null });
    } catch (error: any) {
      const errorObj = {
        general: error.response?.data?.error || "An unexpected error occurred",
      };
      set({ apiError: errorObj });
    }
  },

  updateUser: async (id: string, updatedUser: UpdateUserType) => {
    try {
      await updateRegister(id, updatedUser);
      set({ apiError: null });
    } catch (error: any) {
      const errorObj = {
        general: error.response?.data?.error || "An unexpected error occurred",
      };
      set({ apiError: errorObj });
    }
  },
}));

export const useBlogStore = create<blogStore>((set) => ({
  blogs: [],
  selectedBlog: null,
  loading: false,
  page: 1,
  limit: 10,
  searchTitle: "",

  createBlog: async (newBlog: CreateBlogTypes): Promise<CreateBlogTypes> => {
    set({ loading: true });
    const response = await createBlog(newBlog);
    set((state) => ({ blogs: [...state.blogs, response], loading: false }));
    return response;
  },

  getBlogs: async (userId, page = 1, limit = 10, title = "", sort = "latest") => {
    set({ loading: true });
    const blogs = await getBlogs(page, limit, title, userId, sort);
    set({ blogs, page, limit, searchTitle: title, loading: false });
},


  getBlog: async (id: string) => {
    set({ loading: true });
    const blog = await getBlog(id);
    set({ selectedBlog: blog, loading: false });
  },

  editBlogs: async (id: string, updatedBlog: Partial<CreateBlogTypes>) => {
    set({ loading: true });
    const updated = await updateBlog(id as string, updatedBlog);
    set((state) => ({
      blogs: state.blogs.map((blog: any) => (blog._id === id ? updated : blog)),
      loading: false,
    }));
  },

  deleteBlogs: async (id) => {
    set({ loading: true });
    await deleteBlog(id as string);
    set((state) => ({
      blogs: state.blogs.filter((blog: any) => blog._id !== id),
      loading: false,
    }));
  },
}));
