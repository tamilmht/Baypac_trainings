from django.forms import BaseModelForm
from django.http import HttpResponse
from django.shortcuts import render,redirect
# from django.http import HttpResponse,request
# from django.template import loader
from .models import Item
from .forms import Itemform
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView

# Create your views here.
def index(request):
    #Template render using httpResponse
    # template = loader.get_template('food/index.html')
    # context = {
    #     'item_list' : Item.objects.all()
    # }
    # return HttpResponse(template.render(context,request))

    #Template render without HttpResponse (Effective way of writing a template render)
    context = {
        'item_list' : Item.objects.all()
    }
    return render(request,'food/index.html',context)

class indexClassView(ListView):
    model = Item
    template_name = 'food/index.html'
    context_object_name = 'item_list'

def detail(request,item_id):
    context = {
        'item' : Item.objects.get(pk = item_id)
    }
    return render(request,'food/details.html',context)

class detailClassView(DetailView):
    model = Item
    template_name = 'food/details.html'
    context_object_name = 'item'

def create_item(request):
    form = Itemform(request.POST or None)

    if form.is_valid():
        form.save()
        return redirect('food:index')
    return render(request,'food/item-form.html',{'form':form})


class create_item_classView(CreateView):
    model = Item
    fields = ['item_name','item_desc','item_price','item_image']
    template_name = 'food/item-form.html'

    def form_valid(self, form):
        form.instance.user_name = self.request.user
        return super().form_valid(form)

def update_item(request,id):
    item_data = Item.objects.get(pk=id)
    form = Itemform(request.POST or None,instance=item_data)

    if form.is_valid():
        form.save()
        return redirect('food:index')
    return render(request,'food/item-form.html',{'form':form,'item_data':item_data})

def delete_item(request,id):
    item_data = Item.objects.get(pk=id)

    if request.method == 'POST':
        item_data.delete()
        return redirect('food:index')
    return render(request,'food/delete-form.html',{'item':item_data})