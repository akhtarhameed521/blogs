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
import { handleApiError, handleApiResponse } from "@/lib/response";

export const useUserStore = create<userStore>((set) => ({
  users: [],
  apiError: null,
  apiSuccess: '',

  createUser: async (newUser: UserRegisterType) => {
    try {
      const createdUser = await userRegister(newUser);
      set((state) => ({
        users: [...state.users, createdUser],
        apiError: null,
        apiSuccess: 'User created successfully',
      }));
    } catch (error: any) {
      handleApiError(set, error);
    }
  },

  loadUser: async () => {
    try {
      const users = await getAllUsers();
      set({ users, apiError: null, apiSuccess: 'Users loaded successfully' });
    } catch (error: any) {
      handleApiError(set, error);
    }
  },

  getUser: async (id: string) => {
    try {
      const user = await getUser(id);
      handleApiResponse(set, user, "User fetched successfully");
    } catch (error: any) {
      handleApiError(set, error);
    }
  },

  updateUser: async (id: string, updatedUser: UpdateUserType) => {
    try {
      const response = await updateRegister(id, updatedUser);
      handleApiResponse(set, response, "User updated successfully");
    } catch (error: any) {
      handleApiError(set, error);
    }
  },

  forgetPassword: async (emailData: ForgotPasswordTypes) => {
    try {
      await forgetPassword(emailData);
      set({ apiError: null, apiSuccess: 'Password reset link sent' });
    } catch (error: any) {
      handleApiError(set, error);
    }
  },

  resetPassword: async ({ token, password, confirmPassword }: resetPasswordTypes) => {
    try {
      await resetPasswordAPI({ token, password, confirmPassword });
      set({ apiError: null, apiSuccess: 'Password reset successfully' });
    } catch (error: any) {
      handleApiError(set, error);
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
